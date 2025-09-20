export type Maybe<T> = undefined | T | null;

export type PerformanceDataType = {
  rating: number;
  review: string;
};

export type EmployeeDataType = {
  firstName: string;
  lastName?: string;
  email: string;
  joinDate: Date;
  attendance: AttendanceDataType[];
  performance: PerformanceDataType[];
};

export type AttendanceDataType = {
  date: Date;
  isPresent: boolean;
};

export type LoginOutput = {
  accessToken: string;
};

export type JwtPayloadType = {
  [key: string]: unknown;
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  id?: string;
  email?: string;
};
