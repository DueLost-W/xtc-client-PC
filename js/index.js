/*banner轮播图*/

window.addEventListener('load',function (){
    /*（1）.鼠标经过图片显示箭头 不经过隐藏*/
      //(1)获取元素
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var banner = document.querySelector('.banner>.wrapper');
    var banner_img = document.querySelector('.banner>.wrapper>ul>li');
    var bannerWidth = banner_img.offsetWidth;
    //(2)鼠标经过显示箭头并停止定时器 离开隐藏箭头并打开定时器
    banner.addEventListener('mouseenter',function (){
        prev.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer)
        timer = null //清除定时器变量
    });
    banner.addEventListener('mouseleave',function (){
        prev.style.display = 'none';
        next.style.display = 'none';
        timer = setInterval(function (){
        /*手动调用点击事件*/
        next.click()
    },2000)
    })

    //(3)动态生成下面的小圆圈（有几次张图生成几个）
    var ul = document.querySelector('.banner>.wrapper>ul')
    var ol = document.querySelector('.banner>ol')
    for (var i = 0;i<ul.children.length;i++){
            //创建一个小li，把小li创建到ol里
        var li = document.createElement('li');
            //记录当前小圆圈的索引号，通过自定义属性来做
        li.setAttribute('index',i)
        ol.appendChild(li)
            //小圆圈的排他思想：点击哪个就是显示哪个
        li.addEventListener('click',function (){
            for (var i = 0;i<ol.children.length;i++){
            ol.children[i].className = ''
        }
        this.className = 'current';
        //（5）.点击小圆圈，移动图片
            //ul的移动距离就是小圆圈的索引号乘以图片的宽度 注意是负值
            //当我们点击一个小圆圈，就获得小圆圈的索引号
            var index = this.getAttribute('index');
            //当我们点击某个小li，要把li的索引号给num和circle
            num = index;
            circle = index
            animate(ul,-index * bannerWidth)
        })
    }
    //把ol里面第一个小li设置类名为current
    ol.children[0].className='current';
    //（6）.克隆第一张图片(li)放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first)
    //（7）.点击右侧按钮，图片滚动一张
    var num = 0;
    var circle = 0 //circle控制小圆点的播放

    //（8）右侧按钮做法
    next.addEventListener('click',function (){
        //如果走到了最后复制的第一张图片，此时ul要快速复原left改为0
        if (num == ul.children.length-1){
            ul.style.left=0;
            num = 0
        }
        num++;
        animate(ul,-num * bannerWidth);
    //点击右侧按钮，小圆圈跟随着一起变化，可以用声明的circle变量控制
        circle++;
        //如果circle=图片个数，说明走到最后克隆的图片中了，需要复原
        if (circle == ol.children.length){
            circle = 0
        }
        //先清除其余小圆圈的current类名 留下当前的current类名
        circleChange()
    });
    //（9）左侧按钮做法
        prev.addEventListener('click',function (){
        //如果走到了第一张图片，此时ul要快速复原left改为最后
        if (num == 0){
            num = ul.children.length - 1;
            ul.style.left = -num * bannerWidth +'px';
        }
        num--;
        animate(ul,-num * bannerWidth);
    //点击右侧按钮，小圆圈跟随着一起变化，可以用声明的circle变量控制
        circle--;
        //如果circle<0，说明为第一张图片，则小圆圈要改为第五个图片
        if (circle < 0){
            circle = ol.children.length - 1
        }
        //先清除其余小圆圈的current类名 留下当前的current类名
        circleChange()
    });

        //circleChange函数
        function circleChange(){
            for (var i = 0;i<ol.children.length;i++){
            ol.children[i].className=''
            }
            ol.children[circle].className='current'
        }


        //（10）自动播放功能(相当于点击了右侧按钮）
    var timer = setInterval(function (){
        /*手动调用点击事件*/
        next.click()
    },2000)
})