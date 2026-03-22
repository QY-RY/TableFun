// pages/home/home.js
Page({
  data: {
    currentCity: '北京',
    searchKeyword: '',
    filterType: 'all',
    showSpecial: false,
    showUrgent: false,
    showFull: false,
    showCityModal: false,
    showDateModal: false,
    showTypeModal: false,
    showSortModal: false,
    // 精简：仅保留一套搜索相关字段（删除冗余的filteredScripts/filteredRooms/hasSearchResult）
    showSearchResult: false, // 是否显示搜索结果面板
    searchResults: {         // 搜索结果存储（唯一）
      scripts: [],
      rooms: []
    },
    hasSearchResult: false,  // 是否有搜索结果（用于无结果提示）
    selectedDate: '',
    selectedType: '',
    selectedSort: 'hot',
    banners: [
      {
        id: 1,
        title: '热门剧本限时优惠',
        subtitle: '精选剧本8折起',
        image: '/images/banner1.png'
      },
      {
        id: 2,
        title: '新人专属福利',
        subtitle: '注册送100金币',
        image: '/images/banner2.png'
      },
      {
        id: 3,
        title: '周末主题活动',
        subtitle: '双倍经验值',
        image: '/images/banner3.png'
      }
    ],
    cityData: [
      {
        letter: 'A',
        cities: ['阿坝', '阿克苏', '阿拉善', '阿勒泰', '安康', '安庆', '鞍山', '安顺', '安阳', '澳门']
      },
      {
        letter: 'B',
        cities: ['白城', '白山', '百色', '包头', '保定', '北京', '本溪', '毕节', '滨州', '亳州', '宝鸡', '保山', '白银', '蚌埠', '北海', '巴中']
      },
      {
        letter: 'C',
        cities: ['昌都', '长春', '长沙', '长治', '成都', '承德', '赤峰', '重庆', '楚雄', '潮州', '郴州', '池州', '崇左', '滁州', '沧州', '常州', '朝阳']
      },
      {
        letter: 'D',
        cities: ['大连', '大理', '大庆', '大同', '丹东', '东莞', '德阳', '定安', '东方', '迪庆', '儋州', '达州', '定西', '东营', '德州']
      },
      {
        letter: 'E',
        cities: ['鄂尔多斯', '恩施', '鄂州', '二连浩特']
      },
      {
        letter: 'F',
        cities: ['防城港', '佛山', '福州', '抚顺', '阜新', '抚州', '阜阳']
      },
      {
        letter: 'G',
        cities: ['广安', '甘南', '甘孜', '广元', '固原', '赣州', '广州', '贵港', '贵阳', '桂林', '嘉峪关']
      },
      {
        letter: 'H',
        cities: [
          '哈尔滨', '海口', '海东', '海北', '海南', '海西', '哈密', '邯郸', 
          '杭州', '合肥', '呼和浩特', '和田', '河源', '贺州', '河池', '鹤岗', 
          '鹤壁', '黑河', '衡水', '衡阳', '红河', '淮安', '淮北', '淮南', 
          '黄冈', '黄石', '惠州', '湖州', '黄山', '菏泽', '葫芦岛', '呼伦贝尔', '香港'
        ]
      },
      {
        letter: 'J',
        cities: [
          '吉安', '佳木斯', '鸡西', '济南', '济宁', '济源', '嘉兴', '江门', 
          '焦作', '揭阳', '吉林', '晋城', '晋中', '锦州', '金华', '金昌', 
          '景德镇', '九江', '酒泉', '荆门', '荆州'
        ]
      },
      {
        letter: 'K',
        cities: ['康定', '喀什', '克拉玛依', '克孜勒苏', '可克达拉', '开封', '昆明']
      },
      {
        letter: 'L',
        cities: [
          '拉萨', '兰州', '莱芜', '乐山', '廊坊', '聊城', '丽江', '临沧', 
          '临沂', '临汾', '临夏', '连云港', '凉山', '六安', '六盘水', '辽阳', 
          '辽源', '林芝', '丽水', '柳州', '陇南', '龙岩', '娄底', '泸州', 
          '洛阳', '漯河', '吕梁', '来宾'
        ]
      },
      {
        letter: 'M',
        cities: ['马鞍山', '茂名', '眉山', '绵阳', '梅州', '牡丹江']
      },
      {
        letter: 'N',
        cities: ['南昌', '南宁', '南京', '南通', '南平', '宁波', '那曲', '内江', '南充', '宁德', '怒江', '南阳']
      },
      {
        letter: 'P',
        cities: ['攀枝花', '盘锦', '平顶山', '平凉', '萍乡', '莆田', '普洱', '濮阳']
      },
      {
        letter: 'Q',
        cities: [
          '七台河', '齐齐哈尔', '青岛', '秦皇岛', '钦州', '清远', 
          '泉州', '曲靖', '衢州', '庆阳', '黔东南', '黔南', '黔西南'
        ]
      },
      {
        letter: 'R',
        cities: ['日喀则', '日照']
      },
      {
        letter: 'S',
        cities: [
          '上海', '深圳', '沈阳', '石家庄', '三门峡', '三明', '三亚', 
          '汕头', '汕尾', '商洛', '商丘', '上饶', '山南', '邵阳', '十堰', 
          '石河子', '石嘴山', '双鸭山', '朔州', '四平', '松原', '随州', 
          '遂宁', '绥化', '苏州', '宿迁', '绍兴'
        ]
      },
      {
        letter: 'T',
        cities: [
          '塔城', '泰安', '泰州', '台州', '太原', '天津', '天门', 
          '天水', '唐山', '铁门关', '铁岭', '铜川', '通化', '通辽', '铜陵'
        ]
      },
      {
        letter: 'W',
        cities: [
          '威海', '潍坊', '温州', '无锡', '武汉', '乌海', '乌兰察布', 
          '乌鲁木齐', '文山', '文昌', '万宁', '五指山', '武威', '渭南', 
          '梧州', '芜湖', '吴忠'
        ]
      },
      {
        letter: 'X',
        cities: [
          '西安', '厦门', '西昌', '西双版纳', '锡林郭勒', '襄阳', '咸阳', 
          '湘西', '邢台', '新乡', '信阳', '新余', '忻州', '徐州', '许昌', 
          '宣城', '兴安', '西宁', '仙桃', '咸宁', '孝感', '湘潭'
        ]
      },
      {
        letter: 'Y',
        cities: [
          '雅安', '延安', '延边', '阳江', '阳泉', '伊春', '伊犁', 
          '宜宾', '宜春', '银川', '烟台', '盐城', '扬州', '益阳', 
          '永州', '营口', '宜昌', '岳阳', '云浮', '运城', '玉溪'
        ]
      },
      {
        letter: 'Z',
        cities: [
          '枣庄', '张家口', '张掖', '湛江', '肇庆', '昭通', '张家界', 
          '张家港', '漳州', '郑州', '中山', '珠海', '株洲', '淄博', 
          '自贡', '资阳', '中卫', '周口', '驻马店', '镇江', '遵义', '舟山'
        ]
      }
    ],
    dateOptions: [],
    scriptTypes: ['恐怖', '推理', '悬疑', '古风', '欧式', '科幻', '情感', '欢乐'],
    sortOptions: [
      { label: '热度排序', value: 'hot' },
      { label: '评分排序', value: 'rating' },
      { label: '时间排序', value: 'time' },
      { label: '价格排序', value: 'price' },
      { label: '人数排序', value: 'players' }
    ],
    hotScripts: [
      {
        id: 1,
        name: '午夜惊魂',
        type: '恐怖',
        difficulty: '困难',
        playerCount: 6,
        duration: 4,
        rating: 9.2,
        playCount: 12580,
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
        cover: '/images/script-cover-4.png'
      }
    ],
    activeRooms: [],
    recommendRooms: [
      {
        id: 1,
        name: '新手友好的推理房',
        scriptName: '迷雾侦探',
        scriptCover: '/images/script-cover-2.png',
        status: 'waiting',
        currentPlayers: 3,
        maxPlayers: 5,
        isSpecial: true,
        isUrgent: false,
        isFull: false
      },
      {
        id: 2,
        name: '恐怖体验局',
        scriptName: '午夜惊魂',
        scriptCover: '/images/script-cover-1.png',
        status: 'waiting',
        currentPlayers: 4,
        maxPlayers: 6,
        isSpecial: false,
        isUrgent: true,
        isFull: false
      },
      {
        id: 3,
        name: '古风爱好者',
        scriptName: '宫廷秘史',
        scriptCover: '/images/script-cover-3.png',
        status: 'waiting',
        currentPlayers: 5,
        maxPlayers: 7,
        isSpecial: false,
        isUrgent: false,
        isFull: true
      }
    ],
    newScripts: [
      {
        id: 5,
        name: '最后的晚餐',
        type: '欧式',
        playerCount: 6,
        intro: '19世纪的欧洲庄园，一场看似普通的晚宴，却隐藏着不可告人的秘密...',
        cover: '/images/script-cover-5.png',
        publishTime: '2小时前'
      },
      {
        id: 6,
        name: '时间旅行者',
        type: '科幻',
        playerCount: 5,
        intro: '2077年，时间旅行成为现实，但当你回到过去，发现历史已被改写...',
        cover: '/images/script-cover-6.png',
        publishTime: '5小时前'
      }
    ]
  },

  onLoad() {
    this.initDateOptions();
    // 假设用户已登录，模拟登录状态
    const app = getApp();
    if (!app.globalData.userInfo) {
      const mockUserInfo = {
        id: 'mock_user_001',
        nickname: '桌友小王',
        avatarUrl: '/images/default-avatar.png',
        level: 3,
        exp: 250,
        coins: 1000,
        createTime: new Date().getTime()
      };
      // 兼容：若app未定义setUserInfo，先定义
      if (!app.setUserInfo) {
        app.setUserInfo = function(userInfo) {
          app.globalData.userInfo = userInfo;
        }
      }
      app.setUserInfo(mockUserInfo);
    }
    this.loadActiveRooms();
  },

  onShow() {
    this.loadActiveRooms();
  },

  // 初始化日期选项
  initDateOptions() {
    const dateOptions = [
      { label: '今天', sub: this.formatDate(0), value: 'today' },
      { label: '明天', sub: this.formatDate(1), value: 'tomorrow' },
      { label: '后天', sub: this.formatDate(2), value: 'day3' },
      { label: '周末', sub: this.formatDate(this.getWeekendDays()), value: 'weekend' },
      { label: '不限', sub: '随时都可以', value: 'all' }
    ];
    this.setData({ dateOptions });
  },

  // 格式化日期
  formatDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    return `${month}-${day} 周${weekDays[date.getDay()]}`;
  },

  // 修复：优化周末日期计算逻辑（指向本周六/周日）
  getWeekendDays() {
    const today = new Date();
    const day = today.getDay();
    // 若今天是周六/周日，返回当天；否则返回本周六
    return day === 6 ? 0 : (day === 0 ? 1 : 6 - day);
  },

  // 修复：loadActiveRooms增加兜底逻辑，避免activeRooms未初始化
  loadActiveRooms() {
    const app = getApp();
    const userInfo = app.globalData.userInfo;
    if (userInfo && userInfo.id) {
      const activeRooms = wx.getStorageSync('activeRooms') || [];
      this.setData({ activeRooms });
    } else {
      this.setData({ activeRooms: [] });
    }
  },

  // 搜索输入（绑定输入+回车事件）
  onSearchInput(e) {
    const searchKeyword = e.detail.value.trim();
    this.setData({ searchKeyword });
    // 输入为空时清空搜索结果
    if (!searchKeyword) {
      this.clearSearch();
    }
  },

  // 搜索确认（点击搜索按钮/回车触发）
  onSearchConfirm() {
    const { searchKeyword } = this.data;
    if (!searchKeyword) {
      wx.showToast({ title: '请输入搜索关键词', icon: 'none' });
      this.clearSearch();
      return;
    }
    // 执行搜索过滤
    this.filterSearchResults();
    // 显示搜索结果面板
    this.setData({ showSearchResult: true });
  },

  // 修复：清空搜索（重置所有搜索相关状态）
  clearSearch() {
    this.setData({
      searchKeyword: '',
      showSearchResult: false,
      searchResults: { scripts: [], rooms: [] },
      hasSearchResult: false
    });
  },

  // 修复：完善搜索过滤逻辑（增加结果状态判断）
  filterSearchResults() {
    const { searchKeyword, hotScripts, newScripts, recommendRooms, activeRooms } = this.data;
    const lowerKeyword = searchKeyword.toLowerCase();

    // 1. 过滤剧本（合并热门剧本+新剧本）
    const allScripts = [...hotScripts, ...newScripts];
    const scriptResults = allScripts.filter(script => {
      const nameMatch = script.name.toLowerCase().includes(lowerKeyword);
      const typeMatch = script.type?.toLowerCase().includes(lowerKeyword);
      const introMatch = script.intro?.toLowerCase().includes(lowerKeyword);
      return nameMatch || typeMatch || introMatch;
    });

    // 2. 过滤房间（合并推荐房间+活跃房间）
    const allRooms = [...recommendRooms, ...activeRooms];
    const roomResults = allRooms.filter(room => {
      const roomNameMatch = room.name.toLowerCase().includes(lowerKeyword);
      const scriptNameMatch = room.scriptName.toLowerCase().includes(lowerKeyword);
      return roomNameMatch || scriptNameMatch;
    });

    // 3. 判断是否有搜索结果
    const hasSearchResult = scriptResults.length > 0 || roomResults.length > 0;

    // 更新搜索结果+结果状态
    this.setData({
      searchResults: {
        scripts: scriptResults,
        rooms: roomResults
      },
      hasSearchResult
    });
  },

  // 城市选择
  showCityPicker() {
    this.setData({
      showCityModal: true
    });
  },

  hideCityModal() {
    this.setData({
      showCityModal: false
    });
  },

  selectCity(e) {
    const city = e.currentTarget.dataset.city;
    this.setData({
      currentCity: city,
      showCityModal: false
    });
    this.filterRooms();
  },

  // 筛选选择
  selectFilter(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      filterType: type
    });

    if (type === 'date') {
      this.setData({ showDateModal: true });
    } else if (type === 'area') {
      this.showCityPicker();
    } else if (type === 'type') {
      this.setData({ showTypeModal: true });
    } else if (type === 'sort') {
      this.setData({ showSortModal: true });
    }
  },

  // 日期选择
  hideDateModal() {
    this.setData({
      showDateModal: false
    });
  },

  selectDate(e) {
    const date = e.currentTarget.dataset.date;
    this.setData({
      selectedDate: date,
      showDateModal: false
    });
    this.filterRooms();
  },

  // 类型选择
  hideTypeModal() {
    this.setData({
      showTypeModal: false
    });
  },

  selectScriptType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      selectedType: type,
      showTypeModal: false
    });
    this.filterRooms();
  },

  // 排序选择
  hideSortModal() {
    this.setData({
      showSortModal: false
    });
  },

  selectSort(e) {
    const sort = e.currentTarget.dataset.sort;
    this.setData({
      selectedSort: sort,
      showSortModal: false
    });
    this.sortRooms();
  },

  // 特价筛选
  toggleSpecial() {
    this.setData({
      showSpecial: !this.data.showSpecial
    });
    this.filterRooms();
  },

  // 急车筛选
  toggleUrgent() {
    this.setData({
      showUrgent: !this.data.showUrgent
    });
    this.filterRooms();
  },

  // 即将满车筛选
  toggleFull() {
    this.setData({
      showFull: !this.data.showFull
    });
    this.filterRooms();
  },

  // 筛选房间
  filterRooms() {
    // 实际项目中这里应该调用API进行筛选
    wx.showToast({
      title: '筛选中...',
      icon: 'loading',
      duration: 500
    });
  },

  // 排序房间
  sortRooms() {
    // 实际项目中这里应该调用API进行排序
    wx.showToast({
      title: '排序中...',
      icon: 'loading',
      duration: 500
    });
  },

  // 阻止事件冒泡
  stopPropagation() {},

  // 前往剧本列表
  goToScriptList() {
    wx.switchTab({
      url: '/pages/script-list/script-list'
    });
  },

  // 前往创建房间
  goToCreateRoom() {
    wx.switchTab({
      url: '/pages/create-room/create-room'
    });
  },

  // 前往我的收藏
  goToMyScripts() {
    wx.switchTab({
      url: '/pages/my-scripts/my-scripts'
    });
  },

  // 前往个人中心
  goToProfile() {
    wx.switchTab({
      url: '/pages/profile/profile'
    });
  },

  // 查看剧本详情（原有方法，搜索结果点击复用）
  viewScriptDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/script-detail/script-detail?id=${id}`
    });
  },

  // 进入房间（原有方法，搜索结果点击复用）
  enterRoom(e) {
    const room = e.currentTarget.dataset.room;
    wx.navigateTo({
      url: `/pages/room/room?roomId=${room.id}`
    });
  },

  // 查看房间详情（原有方法）
  viewRoomDetail(e) {
    const room = e.currentTarget.dataset.room;
    wx.showModal({
      title: '加入房间',
      content: `是否要加入"${room.name}"房间？`,
      success: (res) => {
        if (res.confirm) {
          this.joinRoom(room.id);
        }
      }
    });
  },

  // 加入房间（原有方法）
  joinRoom(roomId) {
    wx.showLoading({ title: '加入中...' });

    setTimeout(() => {
      wx.hideLoading();
      wx.navigateTo({
        url: `/pages/room/room?roomId=${roomId}`
      });
    }, 1000);
  }
})