export interface User {
    id: string;            // Unique identifier for the user
    name: string;         // User's full name
    email: string;        // User's email address
    password?: string;    // User's password (optional, not usually stored in the model)
    phone?: string;       // User's phone number (optional)
    createdAt: Date;      // Date when the user was created
    updatedAt: Date;      // Date when the user was last updated
  }