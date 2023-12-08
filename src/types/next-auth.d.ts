import 'next-auth';

declare module 'next-auth' {
  /**
   * Extends the built-in session.user object from next-auth
   */
  interface User {
    id: string;
    user_id: string;
    email: string;
    isNewUser: boolean;
    provider: string;
    is_verified: boolean;
    user_type: string;
  }

  /**
   * Extends the built-in session object from next-auth
   */
  interface Session {
    user: {
      user_id: string;
      isNewUser: boolean;
      provider: string;
      is_verified: boolean;
      user_type: string;
      email: string;
      image: string;
    };
  }
}
