import { UserType, BonusEntry } from '../types/user.type'
import { v4 as uuidv4 } from 'uuid'

// Add a bonus to a user
export function addBonus(user: UserType, amount: number, type: 'perpetual' | 'urgent', reason: string, expiresAt?: number): UserType {
  // If urgent and no expiresAt, set to 3 months from now
  if (type === 'urgent' && !expiresAt) {
    const THREE_MONTHS_MS = 1000 * 60 * 60 * 24 * 30 * 3;
    expiresAt = Date.now() + THREE_MONTHS_MS;
  }
  const bonus: BonusEntry = {
    id: uuidv4(),
    amount,
    type,
    reason,
    issuedAt: Date.now(),
    expiresAt,
    usedAmount: 0,
  }
  user.bonuses = user.bonuses || []
  user.bonuses.push(bonus)
  return user
}

// Deduct bonuses (uses perpetual first, then urgent, oldest first)
export function deductBonus(user: UserType, amount: number): { user: UserType, deducted: number } {
  let toDeduct = amount
  user.bonuses = user.bonuses || []
  // Sort: perpetual first, then urgent, then by soonest expiry/oldest issued
  const sorted = user.bonuses
    .filter(b => !b.expiresAt || b.expiresAt > Date.now())
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === 'perpetual' ? -1 : 1
      if (a.expiresAt && b.expiresAt) return a.expiresAt - b.expiresAt
      return a.issuedAt - b.issuedAt
    })
  for (const bonus of sorted) {
    const available = (bonus.amount - (bonus.usedAmount || 0))
    if (available <= 0) continue
    const use = Math.min(available, toDeduct)
    bonus.usedAmount = (bonus.usedAmount || 0) + use
    toDeduct -= use
    if (toDeduct <= 0) break
  }
  return { user, deducted: amount - toDeduct }
}

// Get available (not expired, not used) bonuses
export function getAvailableBonuses(user: UserType): { total: number, details: BonusEntry[] } {
  user.bonuses = user.bonuses || []
  const now = Date.now()
  const available = user.bonuses.filter(b => (!b.expiresAt || b.expiresAt > now) && (b.amount - (b.usedAmount || 0)) > 0)
  const total = available.reduce((sum, b) => sum + (b.amount - (b.usedAmount || 0)), 0)
  return { total, details: available }
}

// Expire bonuses (set usedAmount = amount for expired urgent bonuses)
export function expireBonuses(user: UserType, now: number = Date.now()): UserType {
  user.bonuses = user.bonuses || []
  for (const bonus of user.bonuses) {
    if (bonus.type === 'urgent' && bonus.expiresAt && bonus.expiresAt <= now) {
      bonus.usedAmount = bonus.amount
    }
  }
  return user
} 