# Google Play Store Deployment Guide

## 🔐 Keystore Creation Process

### Step 1: Create Release Keystore

When you run the keystore generation command, you'll be prompted for:

1. **Keystore password**: Choose a strong password (you'll need this later)
2. **Re-enter keystore password**: Confirm the password
3. **Personal Information**:
   - First and last name: (Your name or company name)
   - Organizational unit: (e.g., "Development Team")
   - Organization: (Your company/personal name)
   - City or Locality: (Your city)
   - State or Province: (Your state)
   - Country code: (e.g., "US", "GB", etc.)
4. **Key password**: Can be the same as keystore password (press Enter) or different

### Important Notes:
- **NEVER lose these passwords** - you can't update your app without them
- **Store them securely** - use a password manager
- **Backup the keystore file** - losing it means you can't update your app

### Example Information:
```
Keystore password: [CHOOSE_STRONG_PASSWORD]
Re-enter password: [SAME_PASSWORD]
First and last name: Penuel M
Organizational unit: BillSplit Development
Organization: BillSplit
City: [Your City]
State: [Your State]
Country: [Your Country Code]
Key password: [Press Enter to use same as keystore, or choose different]
```

## 🚀 After Keystore Creation

1. **Save passwords securely**
2. **Configure Android build**
3. **Generate signed AAB**
4. **Upload to Play Console**

## ⚠️ Security Reminders

- Keep keystore file safe and backed up
- Never commit keystore to version control
- Store passwords in secure password manager
- Consider using Google Play App Signing (recommended)
