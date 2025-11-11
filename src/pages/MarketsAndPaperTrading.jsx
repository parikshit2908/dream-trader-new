import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, LogIn, User, TrendingUp, BookOpen, Video, Info, Mail, LogOut, Home, BarChart3, Search, Bell, Settings, Wallet, Plus, Minus } from 'lucide-react';

const generatePrice = (base, volatility = 0.02) => {
  return base * (1 + (Math.random() - 0.5) * volatility);
};

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('markets');
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [orderSide, setOrderSide] = useState('buy');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [balance, setBalance] = useState(100000);
  const [positions, setPositions] = useState([]);
  const [orders, setOrders] = useState([]);
  
  const [stocks, setStocks] = useState([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.50, change: 2.34, exchange: 'NASDAQ' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.30, change: -1.20, exchange: 'NASDAQ' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.90, change: 3.45, exchange: 'NASDAQ' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 156.78, change: 1.89, exchange: 'NASDAQ' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 238.45, change: -2.67, exchange: 'NASDAQ' },
    { symbol: 'META', name: 'Meta Platforms', price: 489.23, change: 4.12, exchange: 'NASDAQ' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.34, change: 8.92, exchange: 'NASDAQ' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev => prev.map(stock => ({
        ...stock,
        price: generatePrice(stock.price, 0.001),
        change: stock.change + (Math.random() - 0.5) * 0.5
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stock = stocks.find(s => s.symbol === selectedStock);
    if (stock) setPrice(stock.price);
  }, [selectedStock, stocks]);

  const handleLogin = () => {
    if (loginForm.email && loginForm.password) {
      setUser({ name: 'Mritunjay Singh', email: loginForm.email });
      setCurrentPage('markets');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const placeOrder = () => {
    const stock = stocks.find(s => s.symbol === selectedStock);
    const totalCost = orderSide === 'buy' ? stock.price * quantity : 0;
    
    if (orderSide === 'buy' && totalCost > balance) {
      alert('Insufficient balance!');
      return;
    }

    const order = {
      id: Date.now(),
      symbol: selectedStock,
      side: orderSide,
      quantity,
      price: stock.price,
      time: new Date().toLocaleTimeString(),
      status: 'filled'
    };

    setOrders(prev => [order, ...prev]);

    if (orderSide === 'buy') {
      setBalance(prev => prev - totalCost);
      const existingPos = positions.find(p => p.symbol === selectedStock);
      if (existingPos) {
        setPositions(prev => prev.map(p => 
          p.symbol === selectedStock 
            ? { ...p, quantity: p.quantity + quantity, avgPrice: ((p.avgPrice * p.quantity) + (stock.price * quantity)) / (p.quantity + quantity) }
            : p
        ));
      } else {
        setPositions(prev => [...prev, { symbol: selectedStock, quantity, avgPrice: stock.price }]);
      }
    } else {
      const existingPos = positions.find(p => p.symbol === selectedStock);
      if (existingPos && existingPos.quantity >= quantity) {
        setBalance(prev => prev + (stock.price * quantity));
        setPositions(prev => prev.map(p => 
          p.symbol === selectedStock 
            ? { ...p, quantity: p.quantity - quantity }
            : p
        ).filter(p => p.quantity > 0));
      } else {
        alert('Insufficient position to sell!');
      }
    }
  };

  const calculatePnL = (position) => {
    const stock = stocks.find(s => s.symbol === position.symbol);
    if (!stock) return 0;
    return ((stock.price - position.avgPrice) * position.quantity).toFixed(2);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'markets', label: 'Markets', icon: BarChart3 },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'live', label: 'Live Classes', icon: Video },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Enhanced Navbar */}
      <nav className={`fixed top-0 w-full z-50 ${darkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-md border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-700/50 transition-all">
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex items-center gap-2">
                <TrendingUp className="text-blue-500" size={28} />
                <span className="font-bold text-xl bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  DREAM TRADERS
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    currentPage === item.id 
                      ? 'bg-blue-500 text-white' 
                      : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {user && (
                <>
                  <button className="p-2 rounded-lg hover:bg-gray-700/50 transition-all">
                    <Bell size={20} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-700/50 transition-all">
                    <Settings size={20} />
                  </button>
                </>
              )}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-700/50 transition-all"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              {user ? (
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <Wallet size={18} className="text-green-500" />
                    <span className="font-semibold">${balance.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-all"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setCurrentPage('login')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all"
                >
                  <LogIn size={18} />
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sliding Sidebar */}
      <div className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} transform transition-transform duration-300 z-40 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Navigation</h3>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                currentPage === item.id 
                  ? 'bg-blue-500 text-white' 
                  : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </div>

        {user && (
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Login Page */}
        {currentPage === 'login' && !user && (
          <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
            <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-8`}>
              <div className="text-center mb-8">
                <TrendingUp className="mx-auto text-blue-500 mb-4" size={48} />
                <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                <p className="text-gray-400">Sign in to access your trading dashboard</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border-2 border-transparent focus:border-blue-500 outline-none transition-all`}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border-2 border-transparent focus:border-blue-500 outline-none transition-all`}
                    placeholder="••••••••"
                  />
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg font-semibold transition-all transform hover:scale-[1.02]"
                >
                  Sign In
                </button>

                <p className="text-center text-sm text-gray-400">
                  Don't have an account? <button className="text-blue-500 hover:underline">Sign up</button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Markets/Paper Trading Page */}
        {currentPage === 'markets' && user && (
          <div className="h-[calc(100vh-4rem)] flex">
            {/* Watchlist Sidebar */}
            <div className={`w-72 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-y-auto`}>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-4">Watchlist</h3>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search stocks..."
                    className={`w-full pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} outline-none`}
                  />
                </div>

                <div className="space-y-1">
                  {stocks.map(stock => (
                    <button
                      key={stock.symbol}
                      onClick={() => setSelectedStock(stock.symbol)}
                      className={`w-full p-3 rounded-lg transition-all ${
                        selectedStock === stock.symbol 
                          ? 'bg-blue-500 text-white' 
                          : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-left">
                          <div className="font-semibold">{stock.symbol}</div>
                          <div className={`text-xs ${selectedStock === stock.symbol ? 'text-blue-100' : 'text-gray-400'}`}>
                            {stock.exchange}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${stock.price.toFixed(2)}</div>
                          <div className={`text-xs font-semibold ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Chart Area */}
            <div className="flex-1 flex flex-col">
              <div className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedStock}</h2>
                    <p className="text-gray-400">{stocks.find(s => s.symbol === selectedStock)?.name}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">${stocks.find(s => s.symbol === selectedStock)?.price.toFixed(2)}</div>
                    <div className={`text-lg font-semibold ${stocks.find(s => s.symbol === selectedStock)?.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stocks.find(s => s.symbol === selectedStock)?.change >= 0 ? '+' : ''}
                      {stocks.find(s => s.symbol === selectedStock)?.change.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>

              <div className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
                <div className="text-center text-gray-400">
                  <BarChart3 size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-semibold mb-2">Live Chart</p>
                  <p className="text-sm">TradingView Integration Area</p>
                </div>
              </div>

              <div className={`h-48 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4 overflow-y-auto`}>
                <h3 className="font-bold mb-3">Recent Orders</h3>
                {orders.length === 0 ? (
                  <p className="text-gray-400 text-sm">No orders yet. Place your first trade!</p>
                ) : (
                  <div className="space-y-2">
                    {orders.slice(0, 5).map(order => (
                      <div key={order.id} className={`flex justify-between items-center p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${order.side === 'buy' ? 'bg-green-500' : 'bg-red-500'}`}>
                            {order.side.toUpperCase()}
                          </span>
                          <span className="font-semibold">{order.symbol}</span>
                          <span className="text-sm text-gray-400">x{order.quantity}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${order.price.toFixed(2)}</div>
                          <div className="text-xs text-gray-400">{order.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Trading Panel */}
            <div className={`w-96 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-l ${darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-y-auto`}>
              <div className="p-6 space-y-6">
                <h3 className="text-xl font-bold">Place Order</h3>

                <div className="flex gap-2">
                  <button
                    onClick={() => setOrderSide('buy')}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      orderSide === 'buy' ? 'bg-green-500 text-white' : darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                  >
                    <Plus size={20} className="inline mr-2" />
                    Buy
                  </button>
                  <button
                    onClick={() => setOrderSide('sell')}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      orderSide === 'sell' ? 'bg-red-500 text-white' : darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                  >
                    <Minus size={20} className="inline mr-2" />
                    Sell
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    min="1"
                    className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} outline-none`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <input
                    type="text"
                    value={`$${price.toFixed(2)}`}
                    disabled
                    className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} outline-none opacity-50 cursor-not-allowed`}
                  />
                </div>

                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Total Cost</span>
                    <span className="font-bold text-lg">${(price * quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Available Balance</span>
                    <span className="font-semibold">${balance.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={placeOrder}
                  className={`w-full py-4 rounded-lg font-semibold transition-all transform hover:scale-[1.02] ${
                    orderSide === 'buy' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                  } text-white shadow-lg`}
                >
                  {orderSide === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
                </button>

                <div className="pt-6 border-t border-gray-700">
                  <h4 className="font-bold mb-4">Open Positions</h4>
                  {positions.length === 0 ? (
                    <p className="text-gray-400 text-sm">No open positions</p>
                  ) : (
                    <div className="space-y-2">
                      {positions.map(pos => {
                        const pnl = calculatePnL(pos);
                        return (
                          <div key={pos.symbol} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-semibold">{pos.symbol}</span>
                              <span className="text-sm text-gray-400">x{pos.quantity}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-400">Avg: ${pos.avgPrice.toFixed(2)}</span>
                              <span className={`font-semibold ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {pnl >= 0 ? '+' : ''}${pnl}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Pages */}
        {currentPage !== 'login' && currentPage !== 'markets' && (
          <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4 capitalize">{currentPage === 'live' ? 'Live Classes' : currentPage}</h1>
              <p className="text-gray-400 mb-6">This page is under construction</p>
              <button
                onClick={() => setCurrentPage('markets')}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-all"
              >
                Go to Markets
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;