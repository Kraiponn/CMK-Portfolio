export const TH_LOCALE_TYPE = 'th';

export const th = {
  dashboardPage: {
    appbarTitle: 'แผงควบคุม',
    drawerMenu: {
      minimizeMenu: 'ซ่อนเมนู',
      home: 'หน้าหลัก',
      account: 'จัดการบัญชี',
      product: 'จัดการสินค้า',
      order: 'จัดการการสั่งซื้อ',
      notification: 'แจ้งเตือน',
      setting: 'ตั้งค่า',
      signout: 'ลงชื่อออก',
    },
  },
  homePage: {
    title: 'หน้าหลัก',
  },
  topNavBar: {
    home: 'หน้าหลัก',
    product: 'สินค้า',
    signup: 'สมัครสมาชิก',
    signin: 'ลงชื่อเข้าใช้งาน',
    signout: 'ลงชื่อออก',
    about: 'เกี่ยวกับเรา',
    setting: 'ตั้งค่า',
    settingLink: 'ตั้งค่าระบบ',
    buttonLang: 'เลือกภาษา',
    buttonThemeMode: 'เปลี่ยนธีม',
    languageMenu: {
      th: 'ไทย',
      enUs: 'อังกฤษ',
    },
    accountMenu: {
      hover: 'ตั้งค่าบัญชี',
      dashboard: 'แผงควบคุม',
      setting: 'ตั้งค่า',
      signout: 'ลงชื่อออก',
    },
  },
  authPage: {
    uNameLabel: 'ชื่อ-นามสกุล',
    emailLabel: 'อีเมล',
    newPwd: 'รหัสผ่านใหม่',
    pwdLabel: 'รหัสผ่าน',
    confirmPwdLabel: 'ยืนยัน-รหัสผ่าน',
    submitButtonLabel: 'ยืนยัน',
    uNameRequired: 'กรุณาระบุ ชื่อ-นามสกุล',
    emailRequired: 'กรุณาระบุ อีเมล',
    emailValidType: 'รูปแบบอีเมลไม่ถูกต้อง',
    pwdMin: 'รหัสผ่าน ความยาวอย่างน้อยต้อง 6 หลัก',
    pwdMax: 'รหัสผ่าน ความยาวต้องไม่เกิน 16 หลัก',
    pwdRequired: 'กรุณาระบุ รหัสผ่าน',
    confirmPwdMatch: 'ยืนยันรหัสผ่าน ไม่ตรงกับรหัสผ่าน',
    signupLabel: 'ลงทะเบียน',
    signinLabel: 'ลงชื่อ',
    rememberMeLabel: 'จดจำฉันไว้',
    haveAccountLabel: `คุณมีบัญชีแล้วใช่ไหม?`,
    noAccountLabel: `ยังไม่มีบัญชีใช่ไหม?`,
    signupLinkLabel: 'ลงทะเบียนได้ที่นี่',
    forgotPwdLabel: 'ลืมรหัสผ่านใช่ไหม?',
    welcomeLabel: 'ยินดีต้อนรับ',
    welcomeDetailLabel:
      'หากต้องการเชื่อมต่อกับเราต่อไป โปรดลงชื่อเข้าใช้งานด้วยข้อมูลส่วนบุคคลของคุณ',
    signupButton: 'ลงทะเบียน',
  },
  errors: {
    duplicateField: 'ชื่อหรืออีเมลนี้มีอยู่ในระบบอยู่แล้ว',
    notFound: 'ไม่พบข้อมูลที่คุณร้องขอ หรือลองใหม่อีกครั้ง',
    apiNotConnect:
      'การเชื่อมต่อกับ API ล้มเหลว กรุณาตรวจสอบการเชื่อมต่อหรือลองใหม่อีกครั้ง',
    reponseElse: 'พบข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
  },
  productPage: {
    title: 'หน้าสินค้า',
  },
  forgotPasswordPage: {
    title: 'ลืมรหัสผ่านใช่ไหม?',
    description:
      'ป้อน email address ที่เชื่อมโยงกับบัญชีของคุณหลังจากนั้นเราจะส่ง Link เพื่อใช้แก้ไขรหัสผ่านใหม่ที่ mail box ของคุณ',
    emailBoxLabel: 'อีเมล',
    resetPwdButton: 'ร้องขอ ตั้งค่ารหัสผ่านใหม่',
  },
  resetPwdPage: {
    title: 'กำหนดรหัสผ่านใหม่',
    backHome: 'กลับสู่หน้าหลัก',
    finishTitle: 'การร้องขอสำเร็จ',
    finishDescription: 'เราได้ส่งลิ้งสำหรับแก้ไขรหัสผ่านให้คุณทางอีเมล',
  },
  settingsPage: {
    title: 'ตั้งค่าระบบ',
    languages: {
      title: 'ภาษา',
      enUs: 'อังกฤษ',
      th: 'ไทย',
    },
    theme: {
      title: 'พื้นหลัง',
      dark: 'โหมดมืด',
      light: 'โหมดสว่าง',
    },
  },
};
