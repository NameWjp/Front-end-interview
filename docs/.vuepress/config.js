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
            ['/css', 'CSS'],
            ['/html', 'HTML'],
            ['/vue', 'Vue'],
            ['/react', 'React'],
            ['/http', 'HTTP'],
            ['/node', 'Node'],
            ['/arithmetic', '算法'],
            ['/other', '其他'],
        ],
        displayAllHeaders: true,
        smoothScroll: true,
    }
}