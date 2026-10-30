'use client';

import React, { useState, useEffect } from 'react';
import {
  Gift,
  Tag,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  ShoppingBag,
  Car,
  Utensils,
  Leaf,
  Layers,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, RewardCoupon, RedeemedCoupon, RewardCategory } from '@/types';
import { REWARD_CATALOG, getRedeemedCoupons, redeemCoupon, markCouponUsed } from '@/lib/store';

interface RewardsCatalogProps {
  user: UserProfile;
  onPointsUpdated: () => void;
  onStartMission: () => void;
}

export const RewardsCatalog: React.FC<RewardsCatalogProps> = ({
  user,
  onPointsUpdated,
  onStartMission,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<RewardCategory>('all');
  const [activeView, setActiveView] = useState<'catalog' | 'vault'>('catalog');
  const [redeemedList, setRedeemedList] = useState<RedeemedCoupon[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Modal State
  const [successModalCoupon, setSuccessModalCoupon] = useState<RedeemedCoupon | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setRedeemedList(getRedeemedCoupons());
  }, []);

  const refreshVault = () => {
    setRedeemedList(getRedeemedCoupons());
  };

  const handleRedeem = (reward: RewardCoupon) => {
    setErrorMessage(null);
    const result = redeemCoupon(reward);

    if (result.success && result.coupon) {
      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10B981', '#059669', '#34D399', '#FBBF24', '#F59E0B'],
        });
      } catch (e) {
        console.log(e);
      }

      setSuccessModalCoupon(result.coupon);
      refreshVault();
      onPointsUpdated();
    } else {
      setErrorMessage(result.error || 'Failed to redeem coupon');
      setTimeout(() => setErrorMessage(null), 4000);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleToggleUsed = (couponId: string) => {
    markCouponUsed(couponId);
    refreshVault();
  };

  // Filter catalog
  const filteredCatalog = REWARD_CATALOG.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const activeCouponsCount = redeemedList.filter((c) => c.status === 'active').length;

  return (
    <div className="space-y-4 pb-6">
      {/* Top Banner: Available Balance & Vault Toggle */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-800 via-green-800 to-teal-900 text-white p-5 shadow-lg border border-emerald-600/30 relative overflow-hidden">
        <div className="absolute -right-4 -bottom-6 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-2 right-3 text-emerald-400/15 text-6xl font-black select-none pointer-events-none">
          🎁
        </div>

        <div className="flex items-center justify-between mb-2 relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Green Points Rewards Store</span>
          </span>
          <span className="text-[11px] bg-white/15 backdrop-blur-md px-2.5 py-0.5 rounded-full font-semibold text-emerald-100 border border-white/20">
            {activeCouponsCount} Active {activeCouponsCount === 1 ? 'Coupon' : 'Coupons'}
          </span>
        </div>

        <div className="flex items-baseline space-x-2 my-1 relative z-10">
          <span className="text-4xl font-black tracking-tight text-white drop-shadow-xs">
            {user.total_points}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            Eco Points Available to Redeem
          </span>
        </div>

        <p className="text-xs text-emerald-100/90 mt-1 font-medium leading-relaxed">
          Exchange your verified street cleanup points for authentic discount coupons across Amazon, Flipkart, Zomato, Ola, Uber, and more!
        </p>

        {/* View Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-emerald-700/60 relative z-10">
          <button
            onClick={() => setActiveView('catalog')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              activeView === 'catalog'
                ? 'bg-white text-emerald-900 shadow-md'
                : 'bg-emerald-900/50 hover:bg-emerald-900/80 text-emerald-100 border border-emerald-600/40'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Browse Coupons ({REWARD_CATALOG.length})</span>
          </button>

          <button
            onClick={() => setActiveView('vault')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              activeView === 'vault'
                ? 'bg-white text-emerald-900 shadow-md'
                : 'bg-emerald-900/50 hover:bg-emerald-900/80 text-emerald-100 border border-emerald-600/40'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>My Coupons Vault ({redeemedList.length})</span>
          </button>
        </div>
      </div>

      {/* Error alert if insufficient points */}
      {errorMessage && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-3.5 flex items-center space-x-2 text-rose-800 text-xs font-bold shadow-xs animate-shake">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW A: CATALOG VIEW                                     */}
      {/* ======================================================== */}
      {activeView === 'catalog' && (
        <div className="space-y-4">
          {/* Category Filter Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Brands', icon: '✨' },
              { id: 'shopping', label: 'Amazon & Flipkart', icon: '🛍️' },
              { id: 'food', label: 'Zomato & Swiggy', icon: '🍕' },
              { id: 'rides', label: 'Ola & Uber', icon: '🚕' },
              { id: 'groceries', label: 'Groceries', icon: '🥦' },
              { id: 'eco', label: 'Eco & Transit', icon: '🌱' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as RewardCategory)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1 shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Reward Cards Grid */}
          <div className="grid grid-cols-1 gap-3">
            {filteredCatalog.map((reward) => {
              const canAfford = user.total_points >= reward.pointsCost;
              const pointsNeeded = reward.pointsCost - user.total_points;

              return (
                <div
                  key={reward.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all relative overflow-hidden"
                >
                  {/* Popular Ribbon */}
                  {reward.popular && (
                    <span className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-400 text-amber-950 font-black text-[9px] px-2.5 py-0.5 rounded-bl-xl uppercase tracking-wider shadow-2xs">
                      🔥 Popular
                    </span>
                  )}

                  <div className="flex items-start space-x-3.5">
                    {/* Brand Icon Badge */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs shrink-0 border border-slate-100 ${reward.bgLight}`}
                    >
                      {reward.logoEmoji}
                    </div>

                    {/* Middle Info */}
                    <div className="flex-1 min-w-0 pr-12">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                          {reward.brand}
                        </span>
                        <span className="text-[10px] text-slate-300">•</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                          {reward.discountValue}
                        </span>
                      </div>

                      <h4 className="text-sm font-black text-slate-900 leading-snug mt-0.5">
                        {reward.title}
                      </h4>

                      <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                        {reward.description}
                      </p>

                      <p className="text-[10px] text-slate-400 mt-1 italic">
                        {reward.terms}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Row: Cost and Action */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black">
                        🌿
                      </div>
                      <span className="text-sm font-black text-emerald-800">
                        {reward.pointsCost}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        Eco Points
                      </span>
                    </div>

                    {canAfford ? (
                      <button
                        onClick={() => handleRedeem(reward)}
                        className="py-1.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-black shadow-sm transition-all flex items-center space-x-1"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Redeem Coupon</span>
                      </button>
                    ) : (
                      <button
                        onClick={onStartMission}
                        className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-[11px] font-bold border border-slate-200 transition-colors flex items-center space-x-1"
                        title="Start a mission to earn more points"
                      >
                        <span>Need {pointsNeeded} more pts</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW B: MY COUPONS VAULT                                 */}
      {/* ======================================================== */}
      {activeView === 'vault' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wide">
              Your Redeemed Vouchers ({redeemedList.length})
            </h3>
            <span className="text-[10px] text-slate-500 font-medium">
              Copy code &amp; paste at checkout
            </span>
          </div>

          {redeemedList.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-2">
                🎟️
              </div>
              <p className="text-sm font-bold text-slate-800">No coupons redeemed yet!</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Clean local streets to earn Green Points, then redeem them for Amazon, Flipkart, Zomato, or Ola discounts.
              </p>
              <button
                onClick={() => setActiveView('catalog')}
                className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Browse Coupon Store
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {redeemedList.map((coupon) => {
                const isUsed = coupon.status === 'used';
                const dateRedeemedStr = new Date(coupon.redeemedAt).toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });
                const dateExpiryStr = new Date(coupon.expiresAt).toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });

                return (
                  <div
                    key={coupon.id}
                    className={`bg-white rounded-2xl p-4 border transition-all ${
                      isUsed
                        ? 'border-slate-200 opacity-60'
                        : 'border-emerald-300 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2.5">
                        <span className="text-2xl">{coupon.logoEmoji}</span>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                            {coupon.brand} • {coupon.discountValue}
                          </span>
                          <h4 className="text-sm font-black text-slate-900 leading-tight">
                            {coupon.title}
                          </h4>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          isUsed
                            ? 'bg-slate-100 text-slate-500'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        }`}
                      >
                        {isUsed ? 'Used' : 'Active'}
                      </span>
                    </div>

                    {/* Dashed Voucher Box */}
                    <div className="my-3 p-3 bg-emerald-50/70 rounded-xl border-2 border-dashed border-emerald-300 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 block">
                          Coupon Code:
                        </span>
                        <span className="text-base font-mono font-black text-slate-900 tracking-wider">
                          {coupon.couponCode}
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopyCode(coupon.couponCode)}
                        className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                          copiedCode === coupon.couponCode
                            ? 'bg-emerald-700 text-white'
                            : 'bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs'
                        }`}
                      >
                        {copiedCode === coupon.couponCode ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Metadata & Mark Used toggle */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>Redeemed: {dateRedeemedStr}</span>
                      <span>Expires: {dateExpiryStr}</span>
                      <button
                        onClick={() => handleToggleUsed(coupon.id)}
                        className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold underline underline-offset-2"
                      >
                        {isUsed ? 'Mark as Active' : 'Mark as Used'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* REDEMPTION SUCCESS MODAL POPUP                           */}
      {/* ======================================================== */}
      {successModalCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-2 border-emerald-400 text-center relative animate-scaleUp">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mb-3 shadow-inner">
              🎉
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300">
              Coupon Unlocked!
            </span>

            <h3 className="text-xl font-black text-slate-900 mt-2">
              {successModalCoupon.title}
            </h3>

            <p className="text-xs text-slate-600 mt-1">
              Spent <strong className="text-emerald-700">{successModalCoupon.pointsSpent} Green Points</strong>. Copy the code below and paste it in the {successModalCoupon.brand} app at checkout.
            </p>

            {/* Dashed Code Box */}
            <div className="my-4 p-3.5 bg-emerald-50 rounded-2xl border-2 border-dashed border-emerald-400 flex items-center justify-between">
              <span className="text-lg font-mono font-black text-emerald-950 tracking-wider">
                {successModalCoupon.couponCode}
              </span>
              <button
                onClick={() => handleCopyCode(successModalCoupon.couponCode)}
                className={`py-1.5 px-3 rounded-xl text-xs font-black transition-all flex items-center space-x-1 ${
                  copiedCode === successModalCoupon.couponCode
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                }`}
              >
                {copiedCode === successModalCoupon.couponCode ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex space-x-2.5">
              <button
                onClick={() => {
                  setSuccessModalCoupon(null);
                  setActiveView('vault');
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                View My Vault
              </button>
              <button
                onClick={() => setSuccessModalCoupon(null)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
