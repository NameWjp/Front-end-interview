module.exports = {
    base: '/Front-end-interview/',
    title: '前端面试题',
    head: [
        ['meta', { name: 'referrer', content: 'no-referrer' }],
    ],
    themeConfig: {
        sidebar: [
            ['/', '简介'],
            ['/js', 'JavaScript'],
            ['/implement', '手写和实现'],
            ['/typescript', 'TypeScript'],
            ['/css', 'CSS'],
            ['/html', 'HTML'],
            ['/vue', 'Vue'],
            ['/react', 'React'],
            ['/engineering', '工程化'],
            ['/browser', '浏览器'],
            ['/http', 'HTTP'],
            ['/node', 'Node'],
            ['/arithmetic', '算法'],
            ['/safe', '前端安全'],
            ['/optimize', '前端优化'],
            ['/other', '其他'],
        ],
        displayAllHeaders: true,
        smoothScroll: true,
    }
}