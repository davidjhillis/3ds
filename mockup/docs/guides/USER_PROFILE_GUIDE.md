# User Profile Template 👤

## ✅ Complete Self-Service Profile Page

**View**: http://localhost:8000/user-profile.html

---

## 🎯 **What's Included**

### **Layout**:
- 2-column layout (1/3 - 2/3 split)
- Left: Profile overview & quick links
- Right: Tabbed settings interface
- Responsive (stacks on mobile)

---

## 📋 **Features**

### **1. Profile Card** (Left Column)

**Avatar Section**:
- ✅ Large avatar (96px) with gradient background
- ✅ User initials (JD)
- ✅ Camera icon to upload new photo
- ✅ Purple gradient cover banner

**User Info**:
- ✅ Name: "Jane Doe"
- ✅ Job Title: "Senior Developer"
- ✅ Email: "jane.doe@company.com"

**Quick Stats**:
- ✅ Articles Read: 127
- ✅ Bookmarks: 23

**Quick Links**:
- 📖 My Bookmarks
- 🕐 Reading History
- ⭐ Saved Searches

---

### **2. Editable Profile Info** (Right Column - Tab 1)

**Personal Information** (All Editable):
- ✅ First Name input
- ✅ Last Name input
- ✅ Email Address input
- ✅ Job Title input
- ✅ Company input
- ✅ Bio textarea (3 rows)

**Preferences**:
- ✅ Language dropdown (English US, UK, Spanish, French, German)
- ✅ Timezone dropdown (PT, MT, CT, ET)
- ✅ Theme selector (Light / Dark / Auto buttons)

**Actions**:
- ✅ Cancel button
- ✅ Save Changes button (purple gradient)

---

### **3. Notifications** (Left Sidebar - Card)

**Recent Notifications** (3 shown):
1. 🟣 **New article**: "Advanced Caching Strategies" (2 hours ago)
2. 🔵 **Comment** on "Getting Started" (5 hours ago)
3. 🟢 **Profile updated** successfully (1 day ago)

**Features**:
- ✅ "3 New" badge
- ✅ Icon per notification type
- ✅ Colored borders (purple, blue, green)
- ✅ Timestamps
- ✅ "View All Notifications →" link

---

### **4. Email Subscriptions** (Right Column - Card)

**5 Subscription Options** with toggles:

1. ✅ **Product Updates** (ON)
   - New features and announcements

2. ✅ **New Documentation** (ON)
   - Alerts when docs published

3. ⬜ **Weekly Digest** (OFF)
   - Summary of popular articles

4. ✅ **Comment Replies** (ON)
   - When someone replies

5. ⬜ **Marketing Emails** (OFF)
   - Tips and case studies

**Features**:
- Toggle switches (purple when on)
- Description for each
- Self-service (user controls)

---

### **5. Notification Preferences** (Right Column - Card)

**3 Notification Channels**:

1. ✅ **Email Notifications** (ON)
   - Receive updates via email

2. ⬜ **Browser Notifications** (OFF)
   - Push notifications

3. ✅ **Slack Notifications** (ON)
   - Send to Slack channel

**Features**:
- Icons for each channel
- Toggle switches
- Gray background cards

---

### **6. Account Settings** (Right Column - Card)

**Security Options**:
- 🔑 Change Password (clickable)
- 🛡️ Two-Factor Authentication (Green "Enabled" badge)
- 📱 Connected Devices (clickable)
- 💾 Download Your Data (clickable)

**Danger Zone**:
- 🗑️ Delete Account (Red bordered, warning style)

---

## 🎨 **Design Details**

### **Profile Card**:
- Purple gradient cover (120px height)
- Avatar overlaps cover (-48px margin)
- White border around avatar (4px)
- Stats in gray cards (2 columns)

### **Form Inputs**:
- Border: Gray-300 / Gray-600
- Padding: px-4 py-2
- Rounded: lg
- Focus: Purple ring
- Full width

### **Toggle Switches**:
- Track: Gray-200 / Gray-700
- Active: Purple-600
- Size: 44px × 24px
- Smooth slide animation

### **Tabs**:
- Active: Purple bottom border
- Inactive: Transparent, hover effect
- Font: Semibold, 14px

### **Notification Cards**:
- Icons in colored circles
- Border-left accent (4px)
- Purple/Blue/Green colors
- Hover state on older items

---

## 📱 **Responsive Design**

### Desktop (> 1024px):
```
┌──────────┬─────────────────────┐
│ Profile  │  Settings Tabs      │
│ Card     │  ┌─────────────────┐│
│          │  │ Profile         ││
│ ───────  │  │ Notifications   ││
│          │  │ Subscriptions   ││
│ Quick    │  │ Security        ││
│ Links    │  └─────────────────┘│
│          │                     │
│ Notifs   │  Form Fields        │
│          │  Toggles            │
│          │  Settings           │
└──────────┴─────────────────────┘
```

### Mobile (< 1024px):
```
┌─────────────────┐
│ Profile Card    │
├─────────────────┤
│ Quick Links     │
├─────────────────┤
│ Notifications   │
├─────────────────┤
│ Settings Tabs   │
│ Form Fields     │
│ Subscriptions   │
│ Account         │
└─────────────────┘
```

---

## 🧪 **Test All Features**

### Test Profile Editing:
1. Modify first/last name
2. Change job title
3. Update bio
4. Click "Save Changes"
5. Click "Cancel" to reset

### Test Toggles:
1. Click any toggle switch
2. Watch it slide and change color
3. Toggle on → purple
4. Toggle off → gray

### Test Tabs:
1. Click "Notifications" tab
2. Click "Subscriptions" tab
3. Click "Security" tab
4. Active tab has purple underline

### Test Quick Links:
1. Hover over bookmarks
2. Hover over reading history
3. See purple icon and hover effect

---

## 💡 **Self-Service Features**

**What Users Can Modify**:
- ✅ Avatar (camera button)
- ✅ All profile fields (name, email, title, company, bio)
- ✅ Language preference
- ✅ Timezone
- ✅ Theme (Light/Dark/Auto)
- ✅ All email subscriptions (5 options)
- ✅ Notification channels (3 options)
- ✅ Security settings
- ✅ Account deletion

**All editable, no admin needed!**

---

## 🚀 **View It Now!**

**Open**: http://localhost:8000/user-profile.html

**Navigate from other pages**:
- Click the **avatar in header** (top right)
- Should go to profile page

**Features to test**:
1. See profile card with avatar
2. Edit form fields
3. Toggle subscription switches
4. Click notification items
5. Explore account settings

**Complete self-service profile system!** 👤

