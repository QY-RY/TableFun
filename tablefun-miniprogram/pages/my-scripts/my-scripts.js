// pages/my-scripts/my-scripts.js
const app = getApp();

Page({
  data: {
    userInfo: null,
    collectedScripts: [],
    playedCount: 0,
    roomCount: 0,
    achievementCount: 0
  },

  onLoad() {
    this.loadUserInfo();
  },

  onShow() {
    this.loadUserInfo();
  },

  // 加载用户信息
  loadUserInfo() {
    const userInfo = app.globalData.userInfo;
    if (userInfo) {
      this.setData({ userInfo });
      this.loadCollectedScripts();
      this.loadUserStats();
    }
  },

  // 加载收藏剧本
  loadCollectedScripts() {
    const collectedIds = wx.getStorageSync('collectedScripts') || [];
    const allScripts = [
      {
        id: 1,
        name: '午夜惊魂',
        type: '恐怖',
        playerCount: 6,
        rating: 9.2,
        cover: '/images/script-cover-1.png'
      },
      {
        id: 2,
        name: '迷雾侦探',
        type: '推理',
        playerCount: 5,
        rating: 9.5,
        cover: '/images/script-cover-2.png'
      },
      {
        id: 3,
        name: '宫廷秘史',
        type: '古风',
        playerCount: 7,
        rating: 8.9,
        cover: '/images/script-cover-3.png'
      },
      {
        id: 4,
        name: '悬疑之夜',
        type: '悬疑',
        playerCount: 6,
        rating: 9.1,
        cover: '/images/script-cover-4.png'
      },
      {
        id: 5,
        name: '最后的晚餐',
        type: '欧式',
        playerCount: 6,
        rating: 8.8,
        cover: '/images/script-cover-5.png'
      },
      {
        id: 6,
        name: '时间旅行者',
        type: '科幻',
        playerCount: 5,
        rating: 9.3,
        cover: '/images/script-cover-6.png'
      }
    ];

    const collectedScripts = allScripts.filter(script => collectedIds.includes(script.id));
    this.setData({ collectedScripts });
  },

  // 加载用户统计数据
  loadUserStats() {
    const myRooms = wx.getStorageSync('myRooms') || [];
    const playedCount = wx.getStorageSync('playedCount') || 0;
    const achievements = wx.getStorageSync('achievements') || [];

    this.setData({
      roomCount: myRooms.length,
      playedCount,
      achievementCount: achievements.length
    });
  },

  // 前往登录
  goToLogin() {
    wx.switchTab({
      url: '/pages/profile/profile'
    });
  },

  // 前往剧本列表
  goToScriptList() {
    wx.switchTab({
      url: '/pages/script-list/script-list'
    });
  },

  // 查看剧本详情
  viewScriptDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/script-detail/script-detail?id=${id}`
    });
  },

  // 取消收藏
  removeCollect(e) {
    const id = e.currentTarget.dataset.id;
    const collects = wx.getStorageSync('collectedScripts') || [];
    const index = collects.indexOf(id);

    if (index > -1) {
      collects.splice(index, 1);
      wx.setStorageSync('collectedScripts', collects);
      this.loadCollectedScripts();
      wx.showToast({
        title: '已取消收藏',
        icon: 'success'
      });
    }
  },

  // 阻止事件冒泡
  stopPropagation() {},

  // 我的房间
  goToMyRooms() {
    wx.showToast({
      title: '我的房间',
      icon: 'none'
    });
  },

  // 游戏记录
  goToHistory() {
    wx.showToast({
      title: '游戏记录',
      icon: 'none'
    });
  },

  // 成就
  goToAchievements() {
    wx.showToast({
      title: '成就',
      icon: 'none'
    });
  },

  // 设置
  goToSettings() {
    wx.showToast({
      title: '设置',
      icon: 'none'
    });
  }
})
