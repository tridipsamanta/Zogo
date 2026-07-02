import crypto from "crypto";

export const SUPER_ADMIN_EMAIL = "hiranmay20@gmail.com";

export const USER_ROLES = {
  CUSTOMER: "CUSTOMER",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const SUPER_ADMIN_PERMISSIONS = [
  "FULL_ACCESS",
  "DASHBOARD",
  "PRODUCTS",
  "ORDERS",
  "CUSTOMERS",
  "INVENTORY",
  "ANALYTICS",
  "COUPONS",
  "REPORTS",
  "SETTINGS",
] as const;

export type AdminPermission = (typeof SUPER_ADMIN_PERMISSIONS)[number];

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  role: UserRole;
  permissions?: AdminPermission[];
  passwordHash: string;
  createdAt: string;
  totalOrders: number;
  totalSpent: number;
  isBlocked: boolean;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  name: string;
  phone: string;
  line1: string;
  line2: string | null;
  city: string;
  district: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export const users: User[] = [
  {
    id: "u-admin",
    name: "ZOGO Admin",
    email: "admin@zogo.in",
    phone: "9800000001",
    avatar: null,
    role: USER_ROLES.CUSTOMER,
    passwordHash: hashPassword("admin123"),
    createdAt: "2024-01-01T00:00:00Z",
    totalOrders: 0,
    totalSpent: 0,
    isBlocked: false,
  },
  {
    id: "u-001",
    name: "Rahul Mondal",
    email: "rahul@example.com",
    phone: "9800000002",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
    role: USER_ROLES.CUSTOMER,
    passwordHash: hashPassword("password123"),
    createdAt: "2024-06-15T10:30:00Z",
    totalOrders: 12,
    totalSpent: 4850,
    isBlocked: false,
  },
  {
    id: "u-002",
    name: "Priya Das",
    email: "priya@example.com",
    phone: "9800000003",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    role: USER_ROLES.CUSTOMER,
    passwordHash: hashPassword("password123"),
    createdAt: "2024-07-01T09:00:00Z",
    totalOrders: 8,
    totalSpent: 3200,
    isBlocked: false,
  },
  {
    id: "u-003",
    name: "Subhash Ghosh",
    email: "subhash@example.com",
    phone: "9800000004",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=subhash",
    role: USER_ROLES.CUSTOMER,
    passwordHash: hashPassword("password123"),
    createdAt: "2024-07-10T11:00:00Z",
    totalOrders: 5,
    totalSpent: 1890,
    isBlocked: false,
  },
  {
    id: "u-004",
    name: "Sumita Patra",
    email: "sumita@example.com",
    phone: "9800000005",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sumita",
    role: USER_ROLES.CUSTOMER,
    passwordHash: hashPassword("password123"),
    createdAt: "2024-08-02T08:30:00Z",
    totalOrders: 20,
    totalSpent: 8900,
    isBlocked: false,
  },
  {
    id: "u-005",
    name: "Anirban Banerjee",
    email: "anirban@example.com",
    phone: "9800000006",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anirban",
    role: USER_ROLES.CUSTOMER,
    passwordHash: hashPassword("password123"),
    createdAt: "2024-08-15T14:00:00Z",
    totalOrders: 3,
    totalSpent: 1100,
    isBlocked: false,
  },
];

function initializeUsers(): void {
  const superAdminEmail = SUPER_ADMIN_EMAIL.toLowerCase();
  // Default password — override via SUPER_ADMIN_PASSWORD env var in production
  const superAdminPassword =
    process.env.SUPER_ADMIN_PASSWORD ?? 'Admin@zogo2024';

  for (const user of users) {
    user.email = user.email.toLowerCase();

    if (user.email === superAdminEmail) {
      user.role = USER_ROLES.SUPER_ADMIN;
      user.permissions = [...SUPER_ADMIN_PERMISSIONS];
      // Ensure the password is always correct
      user.passwordHash = hashPassword(superAdminPassword);
      user.isBlocked = false;
      console.log(`[ZOGO] ✅ Super Admin found and upgraded: ${superAdminEmail}`);
      continue;
    }

    user.role = USER_ROLES.CUSTOMER;
    delete user.permissions;
  }

  const existingSuperAdmin = users.find(
    (user) => user.email === superAdminEmail,
  );
  if (existingSuperAdmin) {
    return;
  }

  // Create the super admin account if it doesn't exist
  users.unshift({
    id: 'u-super-admin',
    name: 'Hiranmay (Super Admin)',
    email: superAdminEmail,
    phone: '9800000000',
    avatar: null,
    role: USER_ROLES.SUPER_ADMIN,
    permissions: [...SUPER_ADMIN_PERMISSIONS],
    passwordHash: hashPassword(superAdminPassword),
    createdAt: new Date().toISOString(),
    totalOrders: 0,
    totalSpent: 0,
    isBlocked: false,
  });
  console.log(`[ZOGO] ✅ Super Admin created: ${superAdminEmail} / password: ${superAdminPassword}`);
}

initializeUsers();

export const addresses: Address[] = [
  {
    id: "addr-001",
    userId: "u-001",
    label: "Home",
    name: "Rahul Mondal",
    phone: "9800000002",
    line1: "45 Station Road",
    line2: "Near Collectorate",
    city: "Midnapore",
    district: "Paschim Medinipur",
    state: "West Bengal",
    pincode: "721101",
    isDefault: true,
  },
  {
    id: "addr-002",
    userId: "u-001",
    label: "Office",
    name: "Rahul Mondal",
    phone: "9800000002",
    line1: "12 Vidyasagar University Road",
    line2: null,
    city: "Midnapore",
    district: "Paschim Medinipur",
    state: "West Bengal",
    pincode: "721102",
    isDefault: false,
  },
  {
    id: "addr-003",
    userId: "u-002",
    label: "Home",
    name: "Priya Das",
    phone: "9800000003",
    line1: "78 Keranitola",
    line2: "Near Krishna Temple",
    city: "Midnapore",
    district: "Paschim Medinipur",
    state: "West Bengal",
    pincode: "721101",
    isDefault: true,
  },
];

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export function hashPwd(password: string): string {
  return hashPassword(password);
}
