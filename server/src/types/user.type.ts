export type BonusEntry = {
  id: string // unique identifier for the bonus entry
  amount: number
  type: 'perpetual' | 'urgent'
  reason: string
  issuedAt: number // timestamp
  expiresAt?: number // timestamp, only for urgent bonuses
  usedAmount?: number // how much of this bonus has been used
}

export type UserType = {
  id: string
  email: string
  password: string
  token?: string
  registrationDate: number
  bonuses?: BonusEntry[]
  passwordResetToken?: string // for password recovery
  passwordResetTokenExpires?: number // timestamp for token expiry
  fullName?: string
  phone?: string
  birthdate?: string
  deliveryType?: string
  deliveryAddress?: string
}
