export type BonusEntry = {
  id: string
  amount: number
  type: 'perpetual' | 'urgent'
  reason: string
  issuedAt: number
  expiresAt?: number
  usedAmount?: number
}

export type UserType = {
  id: string
  email: string
  password: string
  token?: string
  registrationDate: number
  bonuses?: BonusEntry[]
  fullName?: string
  phone?: string
  birthdate?: string
  deliveryType?: string
  deliveryAddress?: string
}
