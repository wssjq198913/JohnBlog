在我的项目中cache-control没有设置，但是发现js，css还是被cache了， 200（from cache），查资料发现就算不设值，cache-control默认值是private，然而private是会缓存内容的。

[1] public    ---- 数据内容皆被储存起来，就连有密码保护的网页也储存，安全性很低
[2] private    ---- 数据内容只能被储存到私有的cache，仅对某个用户有效，不能共享
[3] no-cache    ---- 可以缓存，但是只有在跟WEB服务器验证了其有效后，才能返回给客户端
[4] no-store  ---- 请求和响应都禁止被缓存
[4] max-age：   ----- 本响应包含的对象的过期时间
[5] Must-revalidate    ---- 如果缓存过期了，会再次和原来的服务器确定是否为最新数据，而不是和中间的proxy
[6] max-stale  ----  允许读取过期时间必须小于max-stale 值的缓存对象。 
[7] proxy-revalidate  ---- 与Must-revalidate类似，区别在于：proxy-revalidate要排除掉用户代理的缓存的。即其规则并不应用于用户代理的本地缓存上。
[8] s-maxage  ---- 与max-age的唯一区别是,s-maxage仅仅应用于共享缓存.而不应用于用户代理的本地缓存等针对单用户的缓存. 另外,s-maxage的优先级要高于max-age.
[9] no-transform   ---- 告知代理,不要更改媒体类型,比如jpg,被你改成png.