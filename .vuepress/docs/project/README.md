---
title: 【项目】实现鉴权管理的方式
date: 2021-12-23 15:30:37
tags:
- Project
---

最近的项目中涉及到了登录用户的鉴权管理。对于权限管理，一共采用过两种方式：自定义注解拦截标注方法、 Spring Security 权限管理。根据可扩展性以及复用性考量，更推荐使用 Spring Security 方式。但是对于要求不是特别高的用户来说，更推荐使用第一种方式； Spring Security 中涉及的要素过多，更容易出现错误。

## 自定义注解标注拦截方法

项目中有一些路径是需要在用户登录之后才能访问的，所以需要对登录才能访问的路径映射方法进行自定义注解标注。标注了的方法，表示需要进行登录才能访问。实际上的实现原理需要借助拦截器。

实现步骤：

① 自定义注解

```java
@Target(ElementType.METHOD)  // 规定书写的位置为方法上
@Retention(RetentionPolicy.RUNTIME)  // 规定生效的时机为运行时
public @interface LoginRequired {
}
```

② 对未登录的用户请求进行拦截

```java
@Component
public class LoginRequiredInterceptor implements HandlerInterceptor {

    @Autowired
    private HostHolder hostHolder;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 主要是判断用户是否登录，以及请求的方法上是否带有 @LoginRequired 注解
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            Method method = handlerMethod.getMethod();
            LoginRequired annotation = method.getAnnotation(LoginRequired.class);
            if (annotation != null && hostHolder.getUser() == null) {
                // 此种情况表示存在注解但是用户并没有登录，应该拦截请求
                response.sendRedirect(request.getContextPath() + "/login");
                return false;
            }
        }
        return true;
    }
}
```

上述代码是关键代码，主要是对未登录用户的请求进行拦截。首先获取请求的方法，判断方法上面是否标注有自定义的注解，如果标注了自定义的注解，则判断用户的登录情况，如果进行了登录，则放行请求，否则禁止。

③ 配置自定义的拦截器

```java
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Autowired
    private LoginRequiredInterceptor loginRequiredInterceptor;
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 添加登录鉴权，配置登录检验拦截器
        registry.addInterceptor(loginRequiredInterceptor)
                .excludePathPatterns("/**/*.css", "/**/*.js", "/**/*.png", "/**/*.jpg", "/**/*.jpeg");
    }

}
```

④ 使用的时候，直接在 Controller 的路径映射方法上添加自定义的注解

```java
@LoginRequired
@RequestMapping(path = "/letter/list", method = RequestMethod.GET)
public String getLetterList(Model model, Page page) {
	// ...
}
```

这样就可以实现登录用户的鉴权管理。

- 优点：原理简单，使用方便，侵入小
- 缺点：功能单一，需求多变的情况下实现较为复杂

## Spring Security 统一权限管理

在项目中添加 Spring Security 依赖包，设置权限名称，规定用户角色名字，根据不同的用户角色名分配不同的访问权限。

Spring Security 提供了整套的安全框架，对于不了解 Spring Security 的用户来说比较复杂。

① 在项目中导入 Spring Security 的依赖包

```xml
<!--Spring Security-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

② 在常量池定义不同的用户权限名称

```java
/**
 * 权限：普通用户
 */
String AUTHORITY_USER = "user";

/**
 * 权限：管理员
 */
String AUTHORITY_ADMIN = "admin";

/**
 * 权限：版主
 */
String AUTHORITY_MODERATOR = "moderator";

/**
 * 权限：作者
 */
String AUTHORITY_AUTHOR = "author";
```

③ 对 Security 进行配置，给不同的角色赋予不同的访问权限

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter implements CommunityConstant {

    /**
     * 忽略对静态资源的拦截
     *
     * @param web web对象
     * @throws Exception 异常
     */
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/resources/**");
    }

    /**
     * 对请求的一些拦截处理
     *
     * @param http http 对象
     * @throws Exception 异常
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // 授权
        http.authorizeRequests()
                .antMatchers(
                        "/user/setting",
                        "/user/upload",
                        "/discuss/add",
                        "/comment/add/**",
                        "/letter/**",
                        "/notice/**",
                        "/like",
                        "/follow",
                        "/unfollow"
                )
                .hasAnyAuthority(
                        AUTHORITY_ADMIN,
                        AUTHORITY_MODERATOR,
                        AUTHORITY_USER,
                        AUTHORITY_AUTHOR
                )
                .antMatchers(
                        "/discuss/top",
                        "/discuss/wonderful"
                )
                .hasAnyAuthority(
                        AUTHORITY_MODERATOR
                )
                .antMatchers(
                        "/discuss/delete",
                        "/data/**",
                        "/actuator/**"
                )
                .hasAnyAuthority(
                        AUTHORITY_ADMIN
                ).
                antMatchers(
                        "/discuss/delete"
                )
                .hasAnyAuthority(
                        AUTHORITY_AUTHOR
                ).anyRequest().permitAll();
        // 禁用 CSRF 检查
        //.and().csrf().disable();

        // 无权限的处理
        http.exceptionHandling()
                .authenticationEntryPoint(new AuthenticationEntryPoint() {
                    @Override
                    public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
                        // 没有登录的处理
                        String xRequestedWith = httpServletRequest.getHeader("x-requested-with");
                        if ("XMLHttpRequest".equals(xRequestedWith)) {
                            // 表示当前请求是异步请求，返回一个 JSON 字符串
                            httpServletResponse.setContentType("application/plain;charset=utf-8");
                            PrintWriter writer = httpServletResponse.getWriter();
                            writer.write(CommunityUtil.getJSONString(403, "您还没有登录，请先登录！"));
                        } else {
                            // 表示当前请求是一个同步请求，直接重定向登录页面
                            httpServletResponse.sendRedirect(httpServletRequest.getContextPath() + "/login");
                        }
                    }
                })
                .accessDeniedHandler(new AccessDeniedHandler() {
                    @Override
                    public void handle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AccessDeniedException e) throws IOException, ServletException {
                        // 没有权限的处理
                        String xRequestedWith = httpServletRequest.getHeader("x-requested-with");
                        if ("XMLHttpRequest".equals(xRequestedWith)) {
                            // 表示当前请求是异步请求，返回一个 JSON 字符串
                            httpServletResponse.setContentType("application/plain;charset=utf-8");
                            PrintWriter writer = httpServletResponse.getWriter();
                            writer.write(CommunityUtil.getJSONString(403, "您没有访问此功能的权限！"));
                        } else {
                            // 表示当前请求是一个同步请求，直接重定向权限不足的页面
                            httpServletResponse.sendRedirect(httpServletRequest.getContextPath() + "/denied");
                        }
                    }
                });

        // Security 会默认拦截 /logout 退出登录的逻辑，进行退出处理
        // 我们需要覆盖 Security 的默认逻辑，执行自定义的退出登录逻辑
        // 此语句的功能就是覆盖默认的拦截路径，使得自定义的 /logout 不被 Security 覆盖
        http.logout().logoutUrl("/securityLogout");
    }
}
```

④ 在 UserService 中，获取用户的权限，并且进行封装

在这个步骤中，是根据数据库中的用户类型字段设置不同的用户权限，设置的权限是先前定义的权限名。

```java
/**
 * 获得用户的权限
 *
 * @return List<GrantedAuthority> 权限列表
 */
public Collection<? extends GrantedAuthority> getAuthorities(int userId) {
    User user = this.findUserById(userId);
    // 获得数据库中的用户权限字段
    List<GrantedAuthority> list = new ArrayList<>();
    list.add((GrantedAuthority) () -> {
        // 获得用户的权限
        switch (user.getType()) {
            case 1:
                return AUTHORITY_ADMIN;
            case 2:
                return AUTHORITY_MODERATOR;
            default:
                return AUTHORITY_USER;
        }
    });
    return list;
}
```

⑤ 在登录的时候，根据登录的用户将不同的权限名存进 SecurityContext （Spring Security上下文）中

```java
@Component
public class LoginTicketInterceptor implements HandlerInterceptor {

    @Autowired
    private UserService userService;

    @Autowired
    private HostHolder hostHolder;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 处理逻辑：主要是从 request 对象中将 Cookie 对象取出来，获得登录凭证
        String ticket = CookieUtil.getValue(request, "ticket");
        if (ticket != null) {
            // 表示存在登录凭证
            LoginTicket loginTicket = userService.getLoginTicket(ticket);
            // 检查登录凭证是否失效
            if (loginTicket != null && loginTicket.getStatus() == 0 & loginTicket.getExpired().after(new Date())) {
                // 根据凭证查询用户
                User user = userService.findUserById(loginTicket.getUserId());
                // 在本次请求中持有用户，使用 ThreadLocal 存储用户
                hostHolder.setUser(user);
                // 将用户授权结果存入 SecurityContext 中，便于 Security 进行授权
                Authentication authentication = new UsernamePasswordAuthenticationToken(
                        user, user.getPassword(), userService.getAuthorities(user.getId())
                );
                SecurityContextHolder.setContext(new SecurityContextImpl(authentication));
            }
        }
        return true;
    }
}
```

⑥ 将授权结果存入 Security 上下文对象中之后，就可以正式使用了。

包括在前端页面中，也可以根据 Security 中配置的内容，对前端中显示的内容做出限制。

```html
<div class="float-right">
   <button type="button" class="btn btn-danger btn-sm" id="topBtn" th:text="${post.type==0?'置顶':'取消置顶'}" sec:authorize="hasAnyAuthority('moderator')">置顶</button>
   <button type="button" class="btn btn-danger btn-sm" id="wonderfulBtn" th:text="${post.status==0?'加精':'取消加精'}" sec:authorize="hasAnyAuthority('moderator')">加精</button>
   <button type="button" class="btn btn-danger btn-sm" id="deleteBtn" th:disabled="${post.status==2}" sec:authorize="hasAnyAuthority('admin','author')">删除</button>
</div>
```

利用 Spring Security 对项目进行权限管理，就是这些步骤。使用上基本遵循【导包——> 自定义用户角色名称——>配置角色权限——>获取用户权限——>权限存进 Security 上下文对象】的步骤，按照步骤进行，就可以进行权限管理了。

