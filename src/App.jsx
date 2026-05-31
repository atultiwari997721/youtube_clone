import React, { useState, useMemo } from 'react'
import {
  Menu,
  Search,
  Bell,
  Video,
  Home,
  Compass,
  Clock,
  ThumbsUp,
  Check,
  ChevronDown,
  Share2,
  MoreHorizontal,
  Settings,
  Flag,
  HelpCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Users,
  Flame,
  Music,
  Gamepad,
  Trophy,
  Lightbulb,
  Library,
  History,
  CornerDownRight,
  Sparkles,
  ArrowRight,
  TrendingUp,
  UserCheck,
  ArrowLeft
} from 'lucide-react'

// Real Channel assets fetched from YouTube
const REAL_AVATAR = "https://yt3.googleusercontent.com/Aw0yypWej36PnBy1bpDAQwi7z-ey_vlpAwgxiIhVTUIDh32aDmtadgD0hzRvw9GHMBSAyvBEyg=s200-c-k-c0x00ffffff-no-rj";
const REAL_BANNER = "https://yt3.googleusercontent.com/AsJyy1XzE_LYaKcaiUuNnuGCvvRXbujkAZcKvuXussh1cRfMK2D_gmh8WkjDlhVpKJPIxkfN=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj";

// Brother's actual videos from @HariDwivedi-q1g with requested biased views
const BROTHER_VIDEOS = [
  {
    id: "udii-VqgwuA",
    title: "20 May 2026",
    views: "512K views",
    viewsNum: 512000,
    age: "3 days ago",
    ageDays: 3,
    duration: "4:17",
    thumbnail: "https://i.ytimg.com/vi/udii-VqgwuA/hqdefault.jpg",
    channelName: "Hari Dwivedi",
    channelAvatar: REAL_AVATAR,
    techBadge: "Web Dev Live",
    description: "Analyzing the hot reload cycles, local environment logs, and micro-app container configurations on a live build server."
  },
  {
    id: "2pOtXFb-VXQ",
    title: "20 May 2026 (Part 2)",
    views: "340K views",
    viewsNum: 340000,
    age: "2 weeks ago",
    ageDays: 14,
    duration: "2:26",
    thumbnail: "https://i.ytimg.com/vi/2pOtXFb-VXQ/hqdefault.jpg",
    channelName: "Hari Dwivedi",
    channelAvatar: REAL_AVATAR,
    techBadge: "Systems Code",
    description: "Session recording walking through server configuration, edge latency monitoring, and compilation runtime analysis."
  },
  {
    id: "mUHJY51p61Q",
    title: "21 May 2026",
    views: "128K views",
    viewsNum: 128000,
    age: "1 month ago",
    ageDays: 30,
    duration: "2:08",
    thumbnail: "https://i.ytimg.com/vi/mUHJY51p61Q/hqdefault.jpg",
    channelName: "Hari Dwivedi",
    channelAvatar: REAL_AVATAR,
    techBadge: "Edge Scripts",
    description: "Testing deployment speed, edge actions, and state synchronization across distributed dev nodes."
  }
];

// Random high-quality popular tech videos from other channels
const OTHER_VIDEOS = [
  {
    id: "3nGRmkrCoBY",
    title: "Tailwind CSS v4.0 is Here! Let's Build a Landing Page",
    views: "1.2M views",
    viewsNum: 1200000,
    age: "3 weeks ago",
    ageDays: 21,
    duration: "25:40",
    thumbnail: "https://i.ytimg.com/vi/3nGRmkrCoBY/hqdefault.jpg",
    channelName: "Tailwind Labs",
    channelAvatarColor: "bg-teal-500",
    techBadge: "Tailwind CSS",
    description: "V4.0 brings a brand new Rust compiler, zero configuration, and CSS-first config. We'll build a responsive SaaS landing page."
  },
  {
    id: "zQnOBmKrcGA",
    title: "TypeScript 5.8: The Features You Should Actually Care About",
    views: "850K views",
    viewsNum: 850000,
    age: "5 days ago",
    ageDays: 5,
    duration: "11:45",
    thumbnail: "https://i.ytimg.com/vi/zQnOBmKrcGA/hqdefault.jpg",
    channelName: "Fireship",
    channelAvatarColor: "bg-blue-600",
    techBadge: "TypeScript",
    description: "TypeScript 5.8 is out with some amazing compiler optimizations, new return type options, and typing utilities. Quick overview!"
  },
  {
    id: "PkZNo7MFNFg",
    title: "Learn WebGL and Three.js in 60 Minutes (Full Course)",
    views: "2.1M views",
    viewsNum: 2100000,
    age: "2 months ago",
    ageDays: 60,
    duration: "1:02:15",
    thumbnail: "https://i.ytimg.com/vi/PkZNo7MFNFg/hqdefault.jpg",
    channelName: "freeCodeCamp.org",
    channelAvatarColor: "bg-neutral-800",
    techBadge: "Three.js",
    description: "A comprehensive beginner-friendly guide to learning 3D graphics inside the web browser using WebGL and Three.js."
  },
  {
    id: "hDwsxgskVyg",
    title: "Next.js 16 Server Components: Best Practices for 2026",
    views: "580K views",
    viewsNum: 580000,
    age: "1 month ago",
    ageDays: 30,
    duration: "14:15",
    thumbnail: "https://i.ytimg.com/vi/hDwsxgskVyg/hqdefault.jpg",
    channelName: "Vercel",
    channelAvatarColor: "bg-neutral-900",
    techBadge: "Next.js",
    description: "Let's explore the new caching protocols, sub-millisecond edge routes, and dynamic streaming architectures in Next.js 16."
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Rick Astley - Never Gonna Give You Up (Official Video)",
    views: "1.5B views",
    viewsNum: 1500000000,
    age: "14 years ago",
    ageDays: 5110,
    duration: "3:33",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    channelName: "Rick Astley",
    channelAvatarColor: "bg-rose-500",
    techBadge: "Classic",
    description: "The official video for 'Never Gonna Give You Up' by Rick Astley. Essential viewing for internet culture enthusiasts."
  }
];

// All videos combined for global browsing and searching
const ALL_VIDEOS = [...BROTHER_VIDEOS, ...OTHER_VIDEOS];

// Mock comments for the video player
const MOCK_COMMENTS = [
  {
    author: "Alex Rivers",
    avatarColor: "bg-red-500",
    time: "2 hours ago",
    content: "Hari, your explanations are stellar. This channel is a hidden gem. Instantly subscribed!"
  },
  {
    author: "TechArch_2026",
    avatarColor: "bg-indigo-500",
    time: "1 day ago",
    content: "The level of detail you put into these code compilations is amazing. Deserves a million subscribers!"
  },
  {
    author: "Priya Sharma",
    avatarColor: "bg-emerald-500",
    time: "3 days ago",
    content: "This is so helpful! Simple, direct, and to the point. Thanks for sharing."
  },
  {
    author: "Developer007",
    avatarColor: "bg-amber-500",
    time: "1 week ago",
    content: "Keep up the great work Hari, these live sessions are exactly what we need."
  }
];

function App() {
  // Navigation views: 'home' (YouTube homepage), 'search' (search results), 'channel' (brother's channel)
  const [view, setView] = useState('channel');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [channelTab, setChannelTab] = useState('Home'); // 'Home' or 'Videos'
  const [searchQuery, setSearchQuery] = useState('');
  const [videoSort, setVideoSort] = useState('Latest');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Playback states (managed locally for likes counter)
  const [likesCount, setLikesCount] = useState(14800);
  const [hasLiked, setHasLiked] = useState(false);

  // Category pill selection on home page
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Dynamic Subscriber count (biased prank helper)
  const subscriberText = useMemo(() => {
    return isSubscribed ? "146K subscribers" : "145K subscribers";
  }, [isSubscribed]);

  // Trigger search action
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim() !== '') {
      setView('search');
      setMobileSearchOpen(false);
    }
  };

  // Sort Hari's videos on channel page
  const sortedHariVideos = useMemo(() => {
    let result = [...BROTHER_VIDEOS];
    if (videoSort === 'Popular') {
      result.sort((a, b) => b.viewsNum - a.viewsNum);
    } else if (videoSort === 'Oldest') {
      result.sort((a, b) => b.ageDays - a.ageDays);
    } else { // Latest
      result.sort((a, b) => a.ageDays - b.ageDays);
    }
    return result;
  }, [videoSort]);

  // Search Results (shows Hari's channel at top, then filtered videos)
  const searchResults = useMemo(() => {
    if (view !== 'search') return [];
    
    // Filter all videos based on query matching title, channel name, or techBadge
    return ALL_VIDEOS.filter(video => 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      video.channelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.techBadge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, view]);

  // Home Feed Recommended Videos (filtered by category if not 'All')
  const homeFeedVideos = useMemo(() => {
    if (selectedCategory === 'All') return ALL_VIDEOS;
    return ALL_VIDEOS.filter(video => 
      video.techBadge.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      video.title.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }, [selectedCategory]);

  const handleLike = () => {
    if (hasLiked) {
      setLikesCount(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <div className="min-h-screen bg-yt-bg text-yt-text-primary font-sans antialiased overflow-x-hidden selection:bg-neutral-800">
      
      {/* 1. FIXED TOP NAVIGATION BAR (56px) */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-yt-bg border-b border-neutral-900 flex items-center justify-between px-4 z-40">
        
        {/* If Mobile Search Overlay is toggled */}
        {mobileSearchOpen ? (
          <div className="absolute inset-0 bg-yt-bg flex items-center justify-between px-2 z-50">
            <button 
              type="button"
              onClick={() => setMobileSearchOpen(false)}
              className="p-2 hover:bg-neutral-800 rounded-full cursor-pointer text-white mr-1 shrink-0"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center">
              <div className="relative flex items-center w-full bg-yt-search-bg border border-neutral-700 rounded-l-full focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 px-4 bg-transparent outline-none text-sm placeholder-neutral-500"
                  autoFocus
                />
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-neutral-400 hover:text-white text-xs font-semibold"
                  >
                    Clear
                  </button>
                )}
              </div>
              <button 
                type="submit"
                className="h-9 px-4 bg-neutral-800 border-y border-r border-neutral-700 rounded-r-full hover:bg-neutral-700 flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Search className="w-4 h-4 text-neutral-300" />
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Left Section */}
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-neutral-800 rounded-full cursor-pointer transition-colors active:bg-neutral-700 hidden sm:block"
                title="Toggle Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div 
                onClick={() => {
                  setView('home');
                  setSearchQuery('');
                }}
                className="flex items-center gap-1.5 cursor-pointer select-none"
              >
                {/* Custom YouTube Red Play Logo */}
                <div className="flex items-center gap-1.5">
                  <div className="w-7 h-5 bg-red-600 rounded-[6px] flex items-center justify-center relative shadow-sm">
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[7px] border-l-white ml-0.5"></div>
                  </div>
                  <span className="font-bold text-lg tracking-tighter flex items-center">
                    YouTube
                    <span className="text-[10px] text-yt-text-secondary font-medium self-start ml-0.5 mt-0.5">IN</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Center Section (Capsule Search Bar - hidden on mobile screens) */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-[640px] px-4">
              <div className="flex w-full">
                <div className="relative flex items-center w-full bg-yt-search-bg border border-neutral-700 rounded-l-full focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-shadow">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-9 px-4 bg-transparent outline-none text-sm placeholder-neutral-500"
                  />
                  {searchQuery && (
                    <button 
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 text-neutral-400 hover:text-white text-xs font-semibold cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
                
                <button 
                  type="submit"
                  className="h-9 px-6 bg-neutral-800 border-y border-r border-neutral-700 rounded-r-full hover:bg-neutral-700 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <Search className="w-4 h-4 text-neutral-300" />
                </button>
              </div>
            </form>

            {/* Right Section */}
            <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
              {/* Search Toggle Icon for Mobile */}
              <button 
                onClick={() => setMobileSearchOpen(true)}
                className="p-2 hover:bg-neutral-800 rounded-full cursor-pointer transition-colors md:hidden"
                title="Search"
              >
                <Search className="w-5 h-5 text-neutral-200" />
              </button>

              <button className="p-2 hover:bg-neutral-800 rounded-full cursor-pointer transition-colors hidden sm:block">
                <Video className="w-5 h-5 text-neutral-200" />
              </button>
              
              <button className="p-2 hover:bg-neutral-800 rounded-full cursor-pointer relative transition-colors">
                <Bell className="w-5 h-5 text-neutral-200" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border border-yt-bg"></span>
              </button>
              
              {/* User Profile Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center font-semibold text-sm cursor-pointer border border-neutral-700 hover:opacity-90 transition-opacity">
                A
              </div>
            </div>
          </>
        )}
      </header>

      {/* Main Content Layout */}
      <div className="pt-14 flex min-h-screen">

        {/* 2. SIDEBAR DRAWER */}
        <aside className={`fixed top-14 bottom-0 left-0 bg-yt-bg border-r border-neutral-900 transition-all duration-300 z-30 overflow-y-auto pb-4
          ${sidebarOpen ? 'w-[240px] translate-x-0' : 'w-0 -translate-x-full xl:w-16 xl:translate-x-0'}
          hidden xl:block`}
        >
          {sidebarOpen ? (
            <div className="p-3 space-y-4">
              {/* Primary Links */}
              <div className="space-y-0.5">
                <button 
                  onClick={() => {
                    setView('home');
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className={`w-full flex items-center gap-5 px-3 py-2 rounded-xl transition-colors font-medium text-sm cursor-pointer
                    ${view === 'home' ? 'bg-neutral-800 text-white font-semibold' : 'hover:bg-neutral-800 text-neutral-300'}`}
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </button>
                <button className="w-full flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-neutral-800 transition-colors text-neutral-300 text-sm cursor-pointer">
                  <Flame className="w-5 h-5" />
                  <span>Shorts</span>
                </button>
                <button 
                  onClick={() => setView('channel')}
                  className={`w-full flex items-center gap-5 px-3 py-2 rounded-xl transition-colors text-sm cursor-pointer
                    ${view === 'channel' ? 'bg-neutral-800 text-white font-semibold' : 'hover:bg-neutral-800 text-neutral-300'}`}
                >
                  <Users className="w-5 h-5" />
                  <span>Subscriptions</span>
                </button>
              </div>

              <hr className="border-neutral-800" />

              {/* Library / History */}
              <div className="space-y-0.5">
                <span className="px-3 text-xs font-semibold text-neutral-500 tracking-wider uppercase mb-1 block">You</span>
                <button className="w-full flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-neutral-800 transition-colors text-neutral-300 text-sm cursor-pointer">
                  <Library className="w-5 h-5" />
                  <span>Library</span>
                </button>
                <button className="w-full flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-neutral-800 transition-colors text-neutral-300 text-sm cursor-pointer">
                  <History className="w-5 h-5" />
                  <span>History</span>
                </button>
                <button className="w-full flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-neutral-800 transition-colors text-neutral-300 text-sm cursor-pointer">
                  <Clock className="w-5 h-5" />
                  <span>Watch Later</span>
                </button>
                <button className="w-full flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-neutral-800 transition-colors text-neutral-300 text-sm cursor-pointer">
                  <ThumbsUp className="w-5 h-5" />
                  <span>Liked Videos</span>
                </button>
              </div>

              <hr className="border-neutral-800" />

              {/* Subscription Channels */}
              <div className="space-y-0.5">
                <span className="px-3 text-xs font-semibold text-neutral-500 tracking-wider uppercase mb-1 block">Subscriptions</span>
                <div 
                  onClick={() => setView('channel')}
                  className={`w-full flex items-center gap-5 px-3 py-2 rounded-xl transition-colors text-sm cursor-pointer
                    ${view === 'channel' ? 'bg-neutral-800 text-white font-semibold' : 'hover:bg-neutral-800 text-neutral-300'}`}
                >
                  <img src={REAL_AVATAR} alt="Hari" referrerPolicy="no-referrer" className="w-6 h-6 rounded-full shrink-0 border border-neutral-700" />
                  <div className="flex items-center gap-1 overflow-hidden">
                    <span className="truncate">Hari Dwivedi</span>
                    <span className="w-3.5 h-3.5 bg-neutral-500 text-yt-bg rounded-full flex items-center justify-center text-[8px] font-bold shrink-0">✓</span>
                  </div>
                </div>
                <div className="w-full flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-neutral-800 transition-colors text-neutral-300 text-sm cursor-pointer">
                  <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-xs font-bold text-white shrink-0">T</div>
                  <span className="truncate">Tailwind Labs</span>
                </div>
                <div className="w-full flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-neutral-800 transition-colors text-neutral-300 text-sm cursor-pointer">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">F</div>
                  <span className="truncate">Fireship</span>
                </div>
              </div>

              <hr className="border-neutral-800" />

              {/* Settings / General */}
              <div className="space-y-0.5">
                <button className="w-full flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-neutral-800 transition-colors text-neutral-300 text-sm cursor-pointer">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
                <button className="w-full flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-neutral-800 transition-colors text-neutral-300 text-sm cursor-pointer">
                  <Flag className="w-5 h-5" />
                  <span>Report History</span>
                </button>
                <button className="w-full flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-neutral-800 transition-colors text-neutral-300 text-sm cursor-pointer">
                  <HelpCircle className="w-5 h-5" />
                  <span>Help</span>
                </button>
              </div>
            </div>
          ) : (
            // Mini Sidebar
            <div className="flex flex-col items-center py-2 gap-1">
              <button 
                onClick={() => { setView('home'); setSearchQuery(''); }}
                className={`w-14 h-14 flex flex-col items-center justify-center rounded-xl cursor-pointer transition-colors
                  ${view === 'home' ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:bg-neutral-800'}`}
              >
                <Home className="w-5 h-5 mb-1" />
                <span className="text-[9px]">Home</span>
              </button>
              <button className="w-14 h-14 flex flex-col items-center justify-center rounded-xl text-neutral-400 hover:bg-neutral-800 cursor-pointer">
                <Flame className="w-5 h-5 mb-1" />
                <span className="text-[9px]">Shorts</span>
              </button>
              <button 
                onClick={() => setView('channel')}
                className={`w-14 h-14 flex flex-col items-center justify-center rounded-xl cursor-pointer transition-colors
                  ${view === 'channel' ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:bg-neutral-800'}`}
              >
                <Users className="w-5 h-5 mb-1" />
                <span className="text-[9px]">Subs</span>
              </button>
              <button className="w-14 h-14 flex flex-col items-center justify-center rounded-xl text-neutral-400 hover:bg-neutral-800 cursor-pointer">
                <Library className="w-5 h-5 mb-1" />
                <span className="text-[9px]">Library</span>
              </button>
            </div>
          )}
        </aside>

        {/* 3. MAIN WORKSPACE CONTENT CONTAINER */}
        <main className={`flex-1 transition-all duration-300 
          ${sidebarOpen ? 'xl:ml-[240px]' : 'xl:ml-16'}
          w-full`}
        >
          
          {/* VIEW A: YOUTUBE HOMEPAGE FEED */}
          {view === 'home' && (
            <div className="p-4 md:p-6 space-y-6 max-w-[1500px] mx-auto">
              
              {/* Category Filter Pills */}
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
                {['All', 'JavaScript', 'Rust', 'Tailwind CSS', 'Next.js', 'Three.js', 'Web Dev', 'Classic'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`h-8 px-4 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer
                      ${selectedCategory === cat 
                        ? 'bg-white text-black font-bold' 
                        : 'bg-neutral-800 hover:bg-neutral-700/80 text-white border border-neutral-800'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Home Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                {homeFeedVideos.map((video) => (
                  <div 
                    key={video.id}
                    className="flex flex-col gap-2 group cursor-pointer"
                    onClick={() => setSelectedVideo(video)}
                  >
                    {/* Thumbnail */}
                    <div className="aspect-video w-full rounded-xl relative overflow-hidden bg-neutral-900 border border-neutral-900 group-hover:border-neutral-800 transition-all">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        loading="lazy"
                      />
                      
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-neutral-950/80 backdrop-blur border border-neutral-800/80 rounded text-[9px] font-mono font-bold tracking-widest text-neutral-300 uppercase">
                        {video.techBadge}
                      </div>

                      <span className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 bg-neutral-950/95 text-[10px] font-mono font-bold text-white rounded">
                        {video.duration}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex gap-2.5 px-1 pt-1">
                      {video.channelAvatar ? (
                        <img 
                          src={video.channelAvatar} 
                          alt={video.channelName} 
                          referrerPolicy="no-referrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setView('channel');
                          }}
                          className="w-8 h-8 rounded-full border border-neutral-800 shrink-0 hover:opacity-90 animate-fade-in"
                        />
                      ) : (
                        <div className={`w-8 h-8 rounded-full ${video.channelAvatarColor || 'bg-blue-600'} flex items-center justify-center font-bold text-xs shrink-0 text-white`}>
                          {video.channelName[0]}
                        </div>
                      )}

                      <div className="flex flex-col min-w-0">
                        <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-neutral-100 transition-colors">
                          {video.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-yt-text-secondary mt-1 font-medium">
                          <span 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (video.channelName === "Hari Dwivedi") setView('channel');
                            }}
                            className="hover:text-white transition-colors"
                          >
                            {video.channelName}
                          </span>
                          {video.channelName === "Hari Dwivedi" && (
                            <span className="w-3.5 h-3.5 bg-neutral-500 text-yt-bg rounded-full flex items-center justify-center text-[7px] font-bold">✓</span>
                          )}
                        </div>
                        <p className="text-xs text-yt-text-secondary mt-0.5">
                          {video.views} &bull; {video.age}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW B: GLOBAL SEARCH RESULTS (Highlights Brother's Channel Card) */}
          {view === 'search' && (
            <div className="p-4 md:p-6 space-y-6 max-w-[1100px] mx-auto">
              
              <h2 className="text-sm text-yt-text-secondary font-mono tracking-widest uppercase">
                Search Results for "{searchQuery}"
              </h2>

              {/* Brother's Channel Spotlight Card */}
              <div className="border-b border-neutral-900 pb-6">
                <div 
                  onClick={() => setView('channel')}
                  className="bg-neutral-900/20 border border-neutral-800/40 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-6 cursor-pointer hover:bg-neutral-900/40 transition-colors group"
                >
                  <img 
                    src={REAL_AVATAR} 
                    alt="Hari Dwivedi" 
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-neutral-800 shrink-0 group-hover:scale-105 transition-transform" 
                  />

                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-neutral-200 transition-colors">
                        Hari Dwivedi
                      </h3>
                      <span className="w-4 h-4 bg-neutral-400 text-yt-bg rounded-full flex items-center justify-center text-[9px] font-bold">✓</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs md:text-sm text-yt-text-secondary flex-wrap">
                      <span className="font-semibold text-white">@HariDwivedi-q1g</span>
                      <span>&bull;</span>
                      <span className="font-bold text-white">{subscriberText}</span>
                      <span>&bull;</span>
                      <span>84 videos</span>
                    </div>

                    <p className="text-xs md:text-sm text-yt-text-secondary line-clamp-2 max-w-[680px]">
                      Building high-performance full-stack web architectures, rendering systems, and devops setups. Check out my programming logs.
                    </p>
                  </div>

                  <div className="shrink-0 pt-3 md:pt-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setIsSubscribed(!isSubscribed)}
                      className={`h-9 px-5 rounded-full text-xs font-bold cursor-pointer transition-colors
                        ${isSubscribed 
                          ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700' 
                          : 'bg-white hover:bg-zinc-200 text-black'}`}
                    >
                      {isSubscribed ? 'Subscribed' : 'Subscribe'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Results List */}
              <div className="space-y-5">
                {searchResults.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-neutral-800 rounded-2xl">
                    <p className="text-neutral-500 text-sm">No videos found. Showing recommendations instead.</p>
                  </div>
                ) : (
                  searchResults.map((video) => (
                    <div 
                      key={video.id}
                      onClick={() => setSelectedVideo(video)}
                      className="flex flex-col sm:flex-row gap-4 group cursor-pointer hover:bg-neutral-900/30 p-2 rounded-xl transition-colors"
                    >
                      <div className="w-full sm:w-[240px] md:w-[280px] shrink-0 aspect-video rounded-xl relative overflow-hidden bg-neutral-900 border border-neutral-900 group-hover:border-neutral-800 transition-all">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                        />
                        <span className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 bg-neutral-950/95 text-[10px] font-mono font-bold text-white rounded">
                          {video.duration}
                        </span>
                      </div>

                      <div className="flex-1 space-y-2 min-w-0 py-1">
                        <h3 className="text-sm md:text-base font-bold text-white leading-snug group-hover:text-neutral-100 transition-colors line-clamp-2">
                          {video.title}
                        </h3>

                        <p className="text-xs text-yt-text-secondary">
                          {video.views} &bull; {video.age}
                        </p>

                        <div className="flex items-center gap-2">
                          {video.channelAvatar ? (
                            <img src={video.channelAvatar} alt={video.channelName} referrerPolicy="no-referrer" className="w-6 h-6 rounded-full border border-neutral-800" />
                          ) : (
                            <div className={`w-6 h-6 rounded-full ${video.channelAvatarColor || 'bg-blue-600'} flex items-center justify-center text-[10px] font-bold text-white`}>
                              {video.channelName[0]}
                            </div>
                          )}
                          <span className="text-xs text-yt-text-secondary font-medium hover:text-white transition-colors">
                            {video.channelName}
                          </span>
                          {video.channelName === "Hari Dwivedi" && (
                            <span className="w-3.5 h-3.5 bg-neutral-500 text-yt-bg rounded-full flex items-center justify-center text-[7px] font-bold">✓</span>
                          )}
                        </div>

                        <p className="text-xs text-neutral-400 line-clamp-2 max-w-[650px] leading-relaxed hidden md:block">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* VIEW C: HARI'S OFFICIAL CHANNEL PAGE */}
          {view === 'channel' && (
            <div>
              {/* Channel Banner */}
              <div className="relative w-full h-[140px] md:h-[220px] lg:h-[260px] bg-neutral-900 overflow-hidden border-b border-neutral-900">
                <img 
                  src={REAL_BANNER} 
                  alt="Hari Dwivedi Banner" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-90 select-none pointer-events-none" 
                />
              </div>

              {/* Channel Details Section */}
              <div className="max-w-[1284px] mx-auto px-4 md:px-6 pt-5 pb-2">
                
                {/* Profile Row */}
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                  
                  {/* Real Circular Avatar */}
                  <img 
                    src={REAL_AVATAR} 
                    alt="Hari Dwivedi Avatar" 
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-neutral-800 shrink-0 shadow-md animate-fade-in"
                  />

                  {/* Metadata */}
                  <div className="flex-1 space-y-2.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
                        Hari Dwivedi
                      </h1>
                      <span className="w-4 h-4 bg-neutral-400 text-yt-bg rounded-full flex items-center justify-center text-[10px] font-bold cursor-default">
                        ✓
                      </span>
                    </div>

                    {/* Stats Line */}
                    <div className="flex flex-wrap items-center text-xs md:text-sm text-yt-text-secondary gap-x-2 gap-y-1">
                      <span className="font-semibold text-white">@HariDwivedi-q1g</span>
                      <span className="text-neutral-700">&bull;</span>
                      <span className="font-bold text-white">{subscriberText}</span>
                      <span className="text-neutral-700">&bull;</span>
                      <span>84 videos</span>
                    </div>

                    {/* Channel Description snippet */}
                    <div className="flex items-center gap-1.5 max-w-[650px] cursor-pointer hover:text-neutral-200 transition-colors group">
                      <p className="text-xs md:text-sm text-yt-text-secondary line-clamp-1">
                        Dev log, programming compilation cycles, server setups, and tech updates.
                      </p>
                      <span className="text-xs text-neutral-400 group-hover:translate-x-0.5 transition-transform shrink-0">&rsaquo;</span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button
                        onClick={() => setIsSubscribed(!isSubscribed)}
                        className={`h-9 px-5 rounded-full text-xs font-bold cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5
                          ${isSubscribed 
                            ? 'bg-neutral-800 hover:bg-neutral-700/80 text-neutral-200 border border-neutral-700' 
                            : 'bg-white hover:bg-zinc-200 text-black'}`}
                      >
                        {isSubscribed ? (
                          <>
                            <span>Subscribed</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          'Subscribe'
                        )}
                      </button>

                      <button className="h-9 px-4 rounded-full bg-neutral-800 hover:bg-neutral-700/80 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer">
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </button>

                      <button className="h-9 px-3 rounded-full bg-neutral-800 hover:bg-neutral-700/80 text-white text-xs font-bold flex items-center justify-center transition-colors cursor-pointer" title="More">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mt-8 border-b border-neutral-800 relative flex items-center gap-6 overflow-x-auto no-scrollbar">
                  {['Home', 'Videos', 'Shorts', 'Playlists', 'Community', 'About'].map((tab) => {
                    const isActive = channelTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => {
                          if (tab === 'Home' || tab === 'Videos') {
                            setChannelTab(tab);
                          }
                        }}
                        className={`py-3.5 text-sm font-semibold tracking-wide relative cursor-pointer whitespace-nowrap transition-colors duration-150
                          ${isActive ? 'text-white font-bold' : 'text-yt-text-secondary hover:text-neutral-200'}
                          ${(tab !== 'Home' && tab !== 'Videos') ? 'opacity-40 cursor-not-allowed' : ''}`}
                      >
                        {tab}
                        {isActive && <div className="active-tab-indicator" />}
                      </button>
                    );
                  })}
                </div>

                {/* Content View */}
                <div className="py-6">
                  
                  {/* Home Subtab */}
                  {channelTab === 'Home' && (
                    <div className="space-y-8">
                      {/* Featured Video Card */}
                      <div className="bg-neutral-900/30 rounded-2xl p-4 md:p-6 border border-neutral-800/50 flex flex-col lg:flex-row gap-6">
                        <div 
                          onClick={() => setSelectedVideo(BROTHER_VIDEOS[0])}
                          className="w-full lg:w-[440px] xl:w-[500px] shrink-0 aspect-video rounded-xl relative overflow-hidden cursor-pointer group shadow-lg border border-neutral-800"
                        >
                          <img src={BROTHER_VIDEOS[0].thumbnail} alt="Featured" referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <div className="w-14 h-14 bg-black/60 backdrop-blur rounded-full flex items-center justify-center text-white border border-neutral-500">
                              <Play className="w-6 h-6 fill-current ml-1" />
                            </div>
                          </div>
                          <span className="absolute top-3 left-3 px-2 py-0.5 bg-neutral-900/90 backdrop-blur border border-neutral-700 text-[10px] font-mono text-neutral-300 rounded uppercase">
                            Featured Video
                          </span>
                          <span className="absolute bottom-3 right-3 px-2 py-0.5 bg-neutral-950/95 text-xs font-mono text-white rounded font-bold">
                            {BROTHER_VIDEOS[0].duration}
                          </span>
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div className="space-y-3">
                            <span className="px-2 py-0.5 bg-neutral-800 text-neutral-300 border border-neutral-700 rounded text-[10px] font-mono font-bold">
                              {BROTHER_VIDEOS[0].techBadge}
                            </span>
                            <h3 
                              onClick={() => setSelectedVideo(BROTHER_VIDEOS[0])}
                              className="text-lg md:text-2xl font-extrabold leading-tight text-white hover:text-neutral-200 cursor-pointer"
                            >
                              {BROTHER_VIDEOS[0].title}
                            </h3>
                            <p className="text-xs text-yt-text-secondary">
                              {BROTHER_VIDEOS[0].views} &bull; {BROTHER_VIDEOS[0].age}
                            </p>
                            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed max-w-[620px]">
                              {BROTHER_VIDEOS[0].description}
                            </p>
                          </div>
                          <button 
                            onClick={() => setSelectedVideo(BROTHER_VIDEOS[0])}
                            className="px-5 py-2.5 bg-white text-black font-bold text-xs rounded-full hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md mt-4 lg:mt-0 self-start"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Watch Now</span>
                          </button>
                        </div>
                      </div>

                      {/* Video Grid Section */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <span>Latest Uploads</span>
                          <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full"></span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                          {BROTHER_VIDEOS.map(video => (
                            <VideoCard key={video.id} video={video} onSelect={() => setSelectedVideo(video)} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Videos Subtab */}
                  {channelTab === 'Videos' && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 flex-wrap">
                        {['Latest', 'Popular', 'Oldest'].map((sortType) => (
                          <button
                            key={sortType}
                            onClick={() => setVideoSort(sortType)}
                            className={`h-8 px-4 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer
                              ${videoSort === sortType
                                ? 'bg-white text-black'
                                : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-800'}`}
                          >
                            {sortType}
                          </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                        {sortedHariVideos.map(video => (
                          <VideoCard key={video.id} video={video} onSelect={() => setSelectedVideo(video)} />
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* 4. MODAL DETAILED VIDEO PLAYER VIEW */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 md:p-4 overflow-y-auto">
          <div className="w-full max-w-[1160px] bg-yt-bg border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[96vh]">
            
            {/* Modal Header */}
            <div className="h-12 border-b border-neutral-800 flex items-center justify-between px-4 shrink-0 bg-neutral-900/40">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                <span className="text-xs font-mono font-bold tracking-wider text-neutral-400">PLAYING ON CLONE DECK</span>
              </div>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-full transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <div className="p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left side (Live Embedded Video Screen & Info) */}
                <div className="lg:col-span-2 space-y-4">
                  
                  {/* Real Borderless YouTube IFrame Embed Player */}
                  <div className="aspect-video w-full rounded-xl bg-black relative overflow-hidden border border-neutral-850 shadow-inner">
                    <iframe 
                      src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
                      title={selectedVideo.title}
                      className="w-full h-full border-0 rounded-xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>

                  {/* Title and stats */}
                  <div className="space-y-3">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold text-white leading-tight">
                      {selectedVideo.title}
                    </h2>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 border-b border-neutral-800">
                      <div className="flex items-center gap-3">
                        {selectedVideo.channelAvatar ? (
                          <img 
                            src={selectedVideo.channelAvatar} 
                            alt="Creator" 
                            referrerPolicy="no-referrer"
                            onClick={() => {
                              setView('channel');
                              setSelectedVideo(null);
                            }}
                            className="w-10 h-10 rounded-full border border-neutral-700 shrink-0 cursor-pointer"
                          />
                        ) : (
                          <div className={`w-10 h-10 rounded-full ${selectedVideo.channelAvatarColor || 'bg-blue-600'} flex items-center justify-center font-bold text-white shrink-0`}>
                            {selectedVideo.channelName[0]}
                          </div>
                        )}

                        <div>
                          <div className="flex items-center gap-1.5">
                            <span 
                              onClick={() => {
                                if (selectedVideo.channelName === "Hari Dwivedi") setView('channel');
                                setSelectedVideo(null);
                              }}
                              className="font-bold text-sm cursor-pointer hover:text-neutral-300"
                            >
                              {selectedVideo.channelName}
                            </span>
                            {selectedVideo.channelName === "Hari Dwivedi" && (
                              <span className="w-3.5 h-3.5 bg-neutral-500 text-yt-bg rounded-full flex items-center justify-center text-[8px] font-bold">✓</span>
                            )}
                          </div>
                          <span className="text-xs text-yt-text-secondary">
                            {selectedVideo.channelName === "Hari Dwivedi" ? subscriberText : "Verified Creator"}
                          </span>
                        </div>

                        {selectedVideo.channelName === "Hari Dwivedi" && (
                          <button
                            onClick={() => setIsSubscribed(!isSubscribed)}
                            className={`h-8 px-4 rounded-full text-xs font-bold cursor-pointer transition-colors ml-4
                              ${isSubscribed 
                                ? 'bg-neutral-800 text-neutral-300 border border-neutral-700' 
                                : 'bg-white text-black hover:bg-zinc-200'}`}
                          >
                            {isSubscribed ? 'Subscribed' : 'Subscribe'}
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-auto">
                        <div className="bg-neutral-800 rounded-full flex items-center overflow-hidden border border-neutral-700/40">
                          <button 
                            onClick={handleLike}
                            className={`h-8 px-4 flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer border-r border-neutral-700/60
                              ${hasLiked ? 'text-blue-400 bg-blue-950/20' : 'text-white'}`}
                          >
                            <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current' : ''}`} />
                            <span>{(likesCount / 1000).toFixed(1)}K</span>
                          </button>
                          <button className="h-8 px-3 hover:bg-neutral-600 text-neutral-400 flex items-center justify-center cursor-pointer">
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button className="h-8 px-4 rounded-full bg-neutral-800 text-white text-xs font-bold flex items-center gap-1.5 border border-neutral-700/40 cursor-pointer">
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>

                    {/* Metadata Card */}
                    <div className="bg-neutral-800/40 border border-neutral-800/80 rounded-xl p-3 text-xs md:text-sm space-y-2">
                      <div className="font-bold flex gap-3 text-white">
                        <span>{selectedVideo.views}</span>
                        <span>{selectedVideo.age}</span>
                        <span className="text-blue-400">#tech #engineering #developer</span>
                      </div>
                      <p className="text-neutral-300">
                        {selectedVideo.description}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Right side (Comments & Up Next list) */}
                <div className="space-y-6">
                  
                  {/* Comments Block */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white tracking-wide border-b border-neutral-800 pb-2">
                      Comments
                    </h3>

                    <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                      {MOCK_COMMENTS.map((c, i) => (
                        <div key={i} className="flex gap-2.5 items-start text-xs">
                          <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center font-bold text-[10px] text-white ${c.avatarColor}`}>
                            {c.author[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-neutral-200">{c.author}</span>
                              <span className="text-[10px] text-neutral-500">{c.time}</span>
                            </div>
                            <p className="text-neutral-300 mt-1">{c.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 items-center border-t border-neutral-800 pt-3">
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        A
                      </div>
                      <input 
                        type="text" 
                        placeholder="Add a comment..."
                        className="bg-neutral-900 border border-neutral-800 text-xs px-3 h-8 rounded-lg flex-1 outline-none focus:border-neutral-600"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                            alert("This is a demo. Comments are locked!");
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Recommendation Queue */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">Up Next</h3>
                    
                    <div className="space-y-3">
                      {ALL_VIDEOS.filter(v => v.id !== selectedVideo.id).slice(0, 3).map(video => (
                        <div 
                          key={video.id}
                          onClick={() => {
                            setSelectedVideo(video);
                          }}
                          className="flex gap-2.5 group cursor-pointer hover:bg-neutral-900/60 p-1.5 rounded-lg transition-colors"
                        >
                          <div className="w-[110px] aspect-video shrink-0 rounded-lg relative overflow-hidden bg-neutral-900 border border-neutral-850">
                            <img src={video.thumbnail} alt={video.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                            <span className="absolute bottom-1 right-1 px-1 bg-neutral-950/80 text-[10px] font-mono text-white rounded">
                              {video.duration}
                            </span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-neutral-200 line-clamp-2 leading-snug group-hover:text-white transition-colors">
                              {video.title}
                            </h4>
                            <div className="flex items-center gap-1 text-[10px] text-yt-text-secondary mt-1">
                              <span>{video.channelName}</span>
                              {video.channelName === "Hari Dwivedi" && (
                                <span className="w-2.5 h-2.5 bg-neutral-500 text-yt-bg rounded-full flex items-center justify-center text-[6px] font-bold">✓</span>
                              )}
                            </div>
                            <p className="text-[10px] text-yt-text-secondary">
                              {video.views}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

// Subcomponent: Channel Video Card
function VideoCard({ video, onSelect }) {
  return (
    <div className="flex flex-col gap-2 group cursor-pointer" onClick={onSelect}>
      
      {/* 16:9 Thumbnail Box */}
      <div className="aspect-video w-full rounded-xl relative overflow-hidden transition-all duration-300 border border-neutral-900 hover:border-neutral-800 shadow-md">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
          loading="lazy"
        />
        
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-neutral-950/80 backdrop-blur border border-neutral-800/80 rounded text-[9px] font-mono font-bold tracking-widest text-neutral-300 uppercase">
          {video.techBadge}
        </div>

        <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-10 h-10 bg-neutral-950/80 backdrop-blur rounded-full flex items-center justify-center text-white border border-neutral-850 shadow shadow-black">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        </div>

        <span className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 bg-neutral-950/95 text-[10px] font-mono font-bold text-white rounded tracking-wide">
          {video.duration}
        </span>
      </div>

      {/* Details metadata */}
      <div className="flex gap-2.5 px-1 pt-1">
        <img 
          src={video.channelAvatar} 
          alt="Hari" 
          referrerPolicy="no-referrer"
          className="w-8 h-8 rounded-full border border-neutral-800 shrink-0 group-hover:scale-105 transition-transform" 
        />
        <div className="flex flex-col min-w-0">
          <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-neutral-100 transition-colors">
            {video.title}
          </h3>
          
          <div className="flex items-center gap-1.5 text-xs text-yt-text-secondary mt-1.5 font-medium">
            <span>Hari Dwivedi</span>
            <span className="w-3.5 h-3.5 bg-neutral-500 text-yt-bg rounded-full flex items-center justify-center text-[7px] font-bold">✓</span>
          </div>

          <p className="text-xs text-yt-text-secondary mt-0.5">
            {video.views} &bull; {video.age}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
