// mocks/handlers.ts
import { http, HttpResponse } from "msw";

interface LoginRequestBody {
  email: string;
  password: string;
}

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    console.log('🎯 MSW Handler called for /api/login');
    
    const body = (await request.json()) as LoginRequestBody;
    const { email, password } = body;

    console.log('📧 Email:', email);
    console.log('🔐 Password:', password);

    if (email === "test@test.com" && password === "123456") {
      console.log('✅ Login successful');
      return HttpResponse.json(
        { success: true, token: "mock-token" },
        { status: 200 }
      );
    }

    console.log('❌ Login failed');
    return HttpResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }),
  
  http.post("/api/signup", async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string };
    const { email, password } = body;

    // Basit iş kuralları (test amaçlı)
    if (!email || !password) {
      return HttpResponse.json({ success: false, message: "Eksik alan" }, { status: 400 });
    }

    // örnek: aynı email tekrar kayıt olamaz (test senaryosu)
    if (email === "exists@test.com") {
      return HttpResponse.json({ success: false, message: "Email zaten kayıtlı" }, { status: 409 });
    }

    // başarılı kayıt
    return HttpResponse.json({ success: true, token: "signup-mock-token" }, { status: 201 });
  }),
];