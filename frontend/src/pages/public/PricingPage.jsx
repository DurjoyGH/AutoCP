import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Gift, Bolt, Gem, ArrowRight, Star, Shield, Rocket } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const PricingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const pricingPlans = [
    {
      name: 'Free',
      price: 0,
      credits: 30,
      period: 'daily',
      icon: Gift,
      color: 'cyan',
      gradient: 'from-cyan-500 to-blue-500',
      description: 'Perfect for getting started',
      highlight: 'Best for Beginners',
      features: [
        { text: '30 credits daily', included: true },
        { text: '3 free test cases', included: true },
        { text: '800 rating only', included: true },
        { text: 'Single topic selection', included: true },
      ],
      limitations: {
        rating: '800 only',
        topics: 'Single selection',
        testCases: '3 included',
      },
      buttonText: 'Get Started Free',
      buttonAction: () => user ? navigate('/dashboard') : navigate('/register'),
    },
    {
      name: 'Basic',
      price: 500,
      credits: 450,
      period: 'monthly',
      icon: Bolt,
      color: 'blue',
      gradient: 'from-blue-500 to-purple-500',
      description: 'Best for regular practice',
      highlight: 'Most Popular',
      popular: true,
      features: [
        { text: '450 credits per month', included: true },
        { text: '5 free test cases', included: true },
        { text: '800-1200 rating', included: true },
        { text: 'Multiple topic selection', included: true },
      ],
      limitations: {
        rating: '800-1200',
        topics: 'Multiple selection',
        testCases: '5 included',
      },
      buttonText: 'Upgrade to Basic',
      buttonAction: () => navigate('/register'),
    },
    {
      name: 'Pro',
      price: 1500,
      credits: 1500,
      period: 'monthly',
      icon: Gem,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      description: 'For serious competitors',
      highlight: 'Maximum Power',
      features: [
        { text: '1500 credits per month', included: true },
        { text: '8 free test cases', included: true },
        { text: '800-1600 rating', included: true },
        { text: 'Multiple topic selection', included: true },
      ],
      limitations: {
        rating: '800-1600',
        topics: 'Multiple selection',
        testCases: '8 included',
      },
      buttonText: 'Upgrade to Pro',
      buttonAction: () => navigate('/register'),
    },
  ];

  const creditCosts = [
    { rating: 800, cost: 20, difficulty: 'Beginner' },
    { rating: 900, cost: 30, difficulty: 'Easy' },
    { rating: 1000, cost: 50, difficulty: 'Easy-Medium' },
    { rating: 1100, cost: 70, difficulty: 'Medium' },
    { rating: 1200, cost: 90, difficulty: 'Medium' },
    { rating: 1300, cost: 120, difficulty: 'Medium-Hard' },
    { rating: 1400, cost: 140, difficulty: 'Hard' },
    { rating: 1500, cost: 170, difficulty: 'Hard' },
    { rating: 1600, cost: 200, difficulty: 'Expert' },
  ];

  return (
    <div className="min-h-screen bg-[#001a1f]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#002029] via-[#00303d] to-[#004052] text-white py-24">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8">
              <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-sm font-semibold">Flexible Pricing for Everyone</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
              Choose Your
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Perfect Plan
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Start free and scale as you grow. No hidden fees, cancel anytime.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-cyan-400 mb-1">30+</div>
                <div className="text-sm text-gray-400">Daily Credits</div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-3xl lg:text-4xl font-black text-purple-400 mb-1">1600</div>
                <div className="text-sm text-gray-400">Max Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-blue-400 mb-1">৳500</div>
                <div className="text-sm text-gray-400">From</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#001520" fillOpacity="1"/>
          </svg>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-20 bg-[#001520] -mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => {
              const Icon = plan.icon;

              return (
                <div
                  key={plan.name}
                  className={`relative group ${plan.popular ? 'lg:-mt-8' : ''}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                      <div className={`bg-gradient-to-r ${plan.gradient} text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2`}>
                        <Star className="w-4 h-4 fill-current" />
                        {plan.highlight}
                      </div>
                    </div>
                  )}

                  {/* Card */}
                  <div className={`relative h-full bg-[#002029] rounded-3xl overflow-hidden transition-all duration-300 ${
                    plan.popular 
                      ? 'border-2 border-blue-500/50 shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40' 
                      : 'border border-[#005066] hover:border-cyan-500/50 hover:shadow-xl'
                  }`}>
                    {/* Gradient Background Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                    <div className="relative z-10 p-8">
                      {/* Icon & Title */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        {!plan.popular && (
                          <span className="text-xs text-gray-400 font-semibold px-3 py-1 bg-[#00303d] rounded-full border border-[#005066]">
                            {plan.highlight}
                          </span>
                        )}
                      </div>

                      <h3 className="text-3xl font-black text-white mb-2">{plan.name}</h3>
                      <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                      {/* Price */}
                      <div className="mb-6">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-5xl font-black text-white">৳{plan.price}</span>
                          {plan.period === 'monthly' && <span className="text-gray-400 text-lg">/month</span>}
                        </div>
                        <div className={`text-sm font-semibold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                          {plan.credits} credits {plan.period === 'daily' ? '• Every Day' : '• Per Month'}
                        </div>
                      </div>

                      {/* Limitations Box */}
                      <div className="mb-6 p-4 bg-[#00303d] rounded-xl border border-[#005066]">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Rating Range:</span>
                            <span className="text-white font-semibold">{plan.limitations.rating}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Topic Selection:</span>
                            <span className="text-white font-semibold">{plan.limitations.topics}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Free Test Cases:</span>
                            <span className="text-white font-semibold">{plan.limitations.testCases}</span>
                          </div>
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="space-y-3 mb-8">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            {feature.included ? (
                              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center shrink-0 mt-0.5`}>
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            ) : (
                              <X className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                            )}
                            <span className={`text-sm ${feature.included ? 'text-gray-300' : 'text-gray-600'}`}>
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={plan.buttonAction}
                        className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group ${
                          plan.popular
                            ? `bg-gradient-to-r ${plan.gradient} hover:scale-105`
                            : 'bg-[#00303d] hover:bg-[#004052] border-2 border-[#005066] hover:border-cyan-500/50'
                        }`}
                      >
                        <span>{plan.buttonText}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Credit Cost Breakdown */}
      <section className="py-20 bg-[#002029]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-6">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-300 font-semibold text-sm">Transparent Pricing</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Credit Cost <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Breakdown</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Know exactly what you're paying for. No surprises, just fair pricing.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Problem Generation Table */}
            <div className="bg-[#00303d] border border-[#005066] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Bolt className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Problem Generation</h3>
                  <p className="text-sm text-gray-400">Cost per difficulty level</p>
                </div>
              </div>

              <div className="space-y-2">
                {creditCosts.map((item, idx) => (
                  <div 
                    key={item.rating} 
                    className="group flex items-center justify-between p-4 rounded-xl bg-[#002029] border border-[#005066] hover:border-cyan-500/50 transition-all cursor-default"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#00303d] border border-[#005066] group-hover:border-cyan-500/50 transition-colors">
                        <span className="text-sm font-bold text-cyan-400">{item.rating}</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">Rating {item.rating}</div>
                        <div className="text-xs text-gray-400">{item.difficulty}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                        {item.cost}
                      </div>
                      <div className="text-xs text-gray-400">credits</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Costs & Examples */}
            <div className="space-y-8">
              {/* Test Cases */}
              <div className="bg-[#00303d] border border-[#005066] rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Test Cases</h3>
                    <p className="text-sm text-gray-400">Additional cost per test case</p>
                  </div>
                </div>

                <div className="bg-[#002029] border border-[#005066] rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-semibold mb-1">Per Test Case</div>
                      <div className="text-sm text-gray-400">Beyond included limit</div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        10
                      </div>
                      <div className="text-xs text-gray-400">credits</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example Calculations */}
              <div className="bg-gradient-to-br from-[#00303d] to-[#002029] border border-[#005066] rounded-2xl p-8">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-cyan-400" />
                  Example Calculations
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-[#002029] border border-[#005066] rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">800 rating + 3 test cases</span>
                      <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 text-xs font-bold">FREE</span>
                    </div>
                    <div className="text-2xl font-black text-cyan-400">20 credits</div>
                  </div>

                  <div className="bg-[#002029] border border-[#005066] rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">1200 rating + 5 test cases</span>
                      <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 text-xs font-bold">BASIC</span>
                    </div>
                    <div className="text-2xl font-black text-blue-400">90 credits</div>
                  </div>

                  <div className="bg-[#002029] border border-[#005066] rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">1600 rating + 8 test cases</span>
                      <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 text-xs font-bold">PRO</span>
                    </div>
                    <div className="text-2xl font-black text-purple-400">200 credits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#001520]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Questions</span>
            </h2>
            <p className="text-gray-400">Everything you need to know about our pricing</p>
          </div>

          <div className="grid gap-4">
            {[
              {
                q: 'What happens if I run out of credits?',
                a: 'You can upgrade your plan anytime or wait for your daily/monthly credit refresh. Free tier users get 30 credits every day automatically.',
              },
              {
                q: 'Do unused credits roll over to the next month?',
                a: 'Yes! For paid plans (Basic & Pro), unused credits roll over to the next billing cycle. Free tier credits reset daily.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, bKash, Nagad, Rocket, and bank transfers for Bangladesh customers.',
              },
             
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className="group bg-[#002029] border border-[#005066] hover:border-cyan-500/50 rounded-xl p-6 transition-all cursor-default"
              >
                <h4 className="text-white font-bold mb-3 group-hover:text-cyan-400 transition-colors">{faq.q}</h4>
                <p className="text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#002029] via-[#00303d] to-[#004052] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">Start Your Journey Today</span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Ready to Generate
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Unlimited Problems?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of competitive programmers using AutoCP to level up their skills
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="group px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black text-lg rounded-xl shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>Start Free Trial</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="px-10 py-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold text-lg rounded-xl border-2 border-white/30 hover:border-cyan-400 transition-all duration-300"
            >
              View Platform Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-12 text-gray-400">
            <div className="text-center">
              <p className="text-4xl font-black text-white mb-1">10K+</p>
              <p className="text-sm">Happy Users</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-white mb-1">50K+</p>
              <p className="text-sm">Problems Generated</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-white mb-1">4.9/5</p>
              <p className="text-sm">User Rating</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
