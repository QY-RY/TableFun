// pages/script-list/script-list.js
Page({
  data: {
    searchKeyword: '',
    activeType: 'all',
    activeSort: 'hot',
    types: ['恐怖', '推理', '悬疑', '古风', '欧式', '科幻', '情感', '欢乐'],
    scripts: [
      {
        id: 1,
        name: '午夜惊魂',
        type: '恐怖',
        difficulty: '困难',
        playerCount: 6,
        duration: 4,
        rating: 9.2,
        playCount: 12580,
        isFree: false,
        price: 100,
        intro: '深夜的古宅，六个陌生人的命运交织...',
        cover: '/images/script-cover-1.png'
      },
      {
        id: 2,
        name: '迷雾侦探',
        type: '推理',
        difficulty: '中等',
        playerCount: 5,
        duration: 3,
        rating: 9.5,
        playCount: 23450,
        isFree: true,
        price: 0,
        intro: '一桩离奇的命案，谁是真正的凶手？',
        cover: '/images/script-cover-2.png'
      },
      {
        id: 3,
        name: '宫廷秘史',
        type: '古风',
        difficulty: '简单',
        playerCount: 7,
        duration: 4,
        rating: 8.9,
        playCount: 8920,
        isFree: false,
        price: 150,
        intro: '皇宫深院，权力与情感的交织...',
        cover: '/images/script-cover-3.png'
      },
      {
        id: 4,
        name: '悬疑之夜',
        type: '悬疑',
        difficulty: '困难',
        playerCount: 6,
        duration: 5,
        rating: 9.1,
        playCount: 15630,
        isFree: false,
        price: 120,
        intro: '迷雾重重，真相只有一个...',
        cover: '/images/script-cover-4.png'
      },
      {
        id: 5,
        name: '最后的晚餐',
        type: '欧式',
        difficulty: '中等',
        playerCount: 6,
        duration: 3,
        rating: 8.8,
        playCount: 7890,
        isFree: true,
        price: 0,
        intro: '19世纪的欧洲庄园，一场看似普通的晚宴...',
        cover: '/images/script-cover-5.png'
      },
      {
        id: 6,
        name: '时间旅行者',
        type: '科幻',
        difficulty: '困难',
        playerCount: 5,
        duration: 4,
        rating: 9.3,
        playCount: 10200,
        isFree: false,
        price: 180,
        intro: '2077年，时间旅行成为现实...',
        cover: '/images/script-cover-6.png'
      },
      {
        id: 7,
        name: '爱在黄昏后',
        type: '情感',
        difficulty: '简单',
        playerCount: 4,
        duration: 2,
        rating: 9.0,
        playCount: 6780,
        isFree: true,
        price: 0,
        intro: '黄昏时分，一段关于爱与遗憾的故事...',
        cover: '/images/script-cover-7.png'
      },
      {
        id: 8,
        name: '欢乐一家亲',
        type: '欢乐',
        difficulty: '简单',
        playerCount: 8,
        duration: 3,
        rating: 8.7,
        playCount: 9560,
        isFree: false,
        price: 80,
        intro: '欢声笑语中，每个人都有自己的秘密...',
        cover: '/images/script-cover-8.png'
      }
    ],
    filteredScripts: [],
    showFilter: false,
    selectedDifficulty: '',
    selectedPlayerCount: '',
    priceType: 'all',
    loading: false,
    hasMore: true,
    page: 1
  },

  onLoad() {
    this.filterScripts();
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
    this.filterScripts();
  },

  // 选择类型
  selectType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      activeType: type
    });
    this.filterScripts();
  },

  // 选择排序
  selectSort(e) {
    const sort = e.currentTarget.dataset.sort;
    this.setData({
      activeSort: sort
    });
    this.filterScripts();
  },

  // 显示筛选弹窗
  showFilterModal() {
    this.setData({
      showFilter: true
    });
  },

  // 隐藏筛选弹窗
  hideFilterModal() {
    this.setData({
      showFilter: false
    });
  },

  // 阻止事件冒泡
  stopPropagation() {},

  // 选择难度
  selectDifficulty(e) {
    const difficulty = e.currentTarget.dataset.difficulty;
    this.setData({
      selectedDifficulty: difficulty
    });
  },

  // 选择人数
  selectPlayerCount(e) {
    const count = e.currentTarget.dataset.count;
    this.setData({
      selectedPlayerCount: count
    });
  },

  // 选择价格类型
  selectPriceType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      priceType: type
    });
  },

  // 重置筛选
  resetFilter() {
    this.setData({
      selectedDifficulty: '',
      selectedPlayerCount: '',
      priceType: 'all'
    });
  },

  // 应用筛选
  applyFilter() {
    this.filterScripts();
    this.hideFilterModal();
  },

  // 筛选剧本
  filterScripts() {
    let filtered = [...this.data.scripts];

    // 搜索关键词筛选
    if (this.data.searchKeyword) {
      const keyword = this.data.searchKeyword.toLowerCase();
      filtered = filtered.filter(script =>
        script.name.toLowerCase().includes(keyword) ||
        script.intro.toLowerCase().includes(keyword)
      );
    }

    // 类型筛选
    if (this.data.activeType !== 'all') {
      filtered = filtered.filter(script => script.type === this.data.activeType);
    }

    // 难度筛选
    if (this.data.selectedDifficulty) {
      filtered = filtered.filter(script => script.difficulty === this.data.selectedDifficulty);
    }

    // 人数筛选
    if (this.data.selectedPlayerCount) {
      const countRange = this.data.selectedPlayerCount;
      if (countRange === '3-4') {
        filtered = filtered.filter(script => script.playerCount >= 3 && script.playerCount <= 4);
      } else if (countRange === '5-6') {
        filtered = filtered.filter(script => script.playerCount >= 5 && script.playerCount <= 6);
      } else if (countRange === '7+') {
        filtered = filtered.filter(script => script.playerCount >= 7);
      }
    }

    // 价格筛选
    if (this.data.priceType === 'free') {
      filtered = filtered.filter(script => script.isFree);
    } else if (this.data.priceType === 'paid') {
      filtered = filtered.filter(script => !script.isFree);
    }

    // 排序
    if (this.data.activeSort === 'hot') {
      filtered.sort((a, b) => b.playCount - a.playCount);
    } else if (this.data.activeSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (this.data.activeSort === 'newest') {
      filtered.reverse();
    } else if (this.data.activeSort === 'players') {
      filtered.sort((a, b) => a.playerCount - b.playerCount);
    }

    this.setData({
      filteredScripts: filtered
    });
  },

  // 加载更多
  loadMoreScripts() {
    if (!this.data.hasMore || this.data.loading) return;

    this.setData({ loading: true });

    // 模拟加载更多数据
    setTimeout(() => {
      // 实际项目中这里应该调用API获取更多数据
      this.setData({
        loading: false,
        hasMore: false
      });
    }, 1000);
  },

  // 查看剧本详情
  viewScriptDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/script-detail/script-detail?id=${id}`
    });
  }
})
