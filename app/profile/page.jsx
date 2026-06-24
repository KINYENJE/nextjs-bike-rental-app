"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Tourney, Syne } from 'next/font/google'
import { FaCheckCircle } from 'react-icons/fa'

const fontTourney = Tourney({ weight: "600", subsets: ['latin'] })
const fontSyne = Syne({ weight: "400", subsets: ['latin'] })

const Page = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const { data: session, status: sessionStatus } = useSession()

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')

  const fetchProfile = async () => {
    if (!session?.user?.email) return
    try {
      const res = await fetch(`${API_URL}/api/check-user?email=${session.user.email}`)
      const data = await res.json()
      if (data.exists) {
        setProfile(data.user)
        setFirstName(data.user.firstName || '')
        setLastName(data.user.lastName || '')
        setPhone(data.user.phone || '')
      } else {
        toast.error('Profile not found. Please complete sign up.')
      }
    } catch (err) {
      toast.error('Error loading profile')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      fetchProfile()
    } else if (sessionStatus === 'unauthenticated') {
      setLoading(false)
    }
  }, [sessionStatus])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`${API_URL}/api/user?email=${session.user.email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, phone }),
      })
      const result = await res.json()
      if (result.status === 'ok') {
        setProfile(result.user)
        toast.success('Profile updated')
      } else {
        toast.error(result.message || 'Error updating profile')
      }
    } catch (err) {
      toast.error('Error updating profile')
    } finally {
      setSaving(false)
    }
  }

  if (sessionStatus === 'unauthenticated') {
    return (
      <section className="min-h-screen flex items-center justify-center flex-col px-4 text-black dark:text-white">
        <p className="opacity-70 mb-4">Please sign in to view your profile.</p>
        <Link href="/login" className="text-dgreen dark:text-dred font-semibold hover:underline underline-offset-4">
          Go to Sign In
        </Link>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <p className="text-black dark:text-white opacity-60 animate-pulse">Loading profile…</p>
      </section>
    )
  }

  const hasChanges =
    firstName !== (profile?.firstName || '') ||
    lastName !== (profile?.lastName || '') ||
    phone !== (profile?.phone || '')

  const inputBase =
    'w-full bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-5 border-2 border-dsectext rounded-md px-3 py-2 outline-none text-black dark:text-white'
  const labelBase = 'text-sm text-black dark:text-white opacity-70 mb-1 block capitalize'

  return (
    <section className={`mx-auto max-w-3xl px-4 min-h-screen flex flex-col justify-center pt-28 pb-16 ${fontSyne.className}`}>
      <h1 className={`font-bold text-3xl sm:text-4xl mb-8 text-black dark:text-white ${fontTourney.className}`}>
        My <span className="text-dgreen dark:text-dred">Profile</span>
      </h1>

      <div className="bg-faintWhite dark:bg-faintBlack border-2 border-dgreen dark:border-dred rounded-2xl p-6 sm:p-8">
        {/* Header: avatar + name */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 mb-6 border-b border-dgreen/40 dark:border-dred/40">
          <div className="rounded-full border-2 border-dgreen dark:border-dred w-20 h-20 flex items-center justify-center overflow-hidden bg-white dark:bg-black shrink-0">
            {session?.user?.image ? (
              <Image src={session.user.image} alt="avatar" width={80} height={80} className="rounded-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-black dark:text-white">
                {(profile?.firstName || session?.user?.name || 'U').charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-black dark:text-white capitalize">
              {profile?.firstName} {profile?.lastName}
            </h2>
            <p className="text-black dark:text-white opacity-60 text-sm">{profile?.email}</p>
            {profile?.isOwner && (
              <span className="inline-flex items-center gap-1.5 mt-2 text-dgreen dark:text-dred text-sm font-semibold">
                <FaCheckCircle /> Bike Owner
              </span>
            )}
          </div>
        </div>

        {/* Editable form */}
        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelBase} htmlFor="firstName">First name</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`${inputBase} focus:border-dgreen dark:focus:border-dred`}
            />
          </div>
          <div>
            <label className={labelBase} htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`${inputBase} focus:border-dgreen dark:focus:border-dred`}
            />
          </div>
          <div>
            <label className={labelBase} htmlFor="phone">Phone (07xxxxxxxx)</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0712345678"
              className={`${inputBase} focus:border-dgreen dark:focus:border-dred placeholder:opacity-40`}
            />
          </div>
          <div>
            <label className={labelBase} htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={profile?.username || ''}
              disabled
              className={`${inputBase} opacity-50 cursor-not-allowed`}
            />
          </div>
          <div>
            <label className={labelBase} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={profile?.email || ''}
              disabled
              className={`${inputBase} opacity-50 cursor-not-allowed`}
            />
          </div>
          <div>
            <label className={labelBase} htmlFor="idNumber">National ID</label>
            <input
              id="idNumber"
              type="text"
              value={profile?.idNumber || 'Not provided'}
              disabled
              className={`${inputBase} opacity-50 cursor-not-allowed`}
            />
          </div>

          <div className="sm:col-span-2 flex justify-end mt-2">
            <button
              type="submit"
              disabled={!hasChanges || saving}
              className={`${fontTourney.className} tracking-wide px-8 py-2.5 rounded-md font-bold text-black dark:text-white bg-dgreen dark:bg-dred transition-opacity ${
                !hasChanges || saving ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-80'
              }`}
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Page
