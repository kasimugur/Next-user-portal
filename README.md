

# **1) REQUIREMENTS — Ne yapıyoruz? (Kesin & Ölçülebilir)**

Bu proje 3 modülden oluşacak:

### **A) Auth (Login) — MVP**

* Email + şifre formu
* Validasyon
* Başarılı login → `/dashboard` yönlendirme
* Unit + Integration test

**Başarı kriteri:**
Login formunda her input, submit ve hata mesajı testle doğrulanacak.

---

### **B) Form Builder (Zorlayıcı Modül)**

* Dinamik input ekleme
* Text / number / select gibi tip seçimi
* Field silme
* Formu kaydetme (local state veya mock API)
* Validasyon kuralları
* React Testing Library + user-event + unit test + hook testleri

**Başarı kriteri:**
Eklenen her alanın DOM’daki doğru karşılığı testle doğrulanacak.
Validasyonlar test edilecek.

---

### **C) Order Panel (Gerçek Dünya Modülü)**

* OrdersContext
* Mock API (MSW) ile veri çekme
* Durum güncelleme
* Filtre
* Liste render testleri
* API mock testleri
* Context + UI integration test

**Başarı kriteri:**
API testleri MSW ile çalışacak, context güncellemeleri testle doğrulanacak.

---

# **2) DESIGN — MİMARİYİ ÇİZİYORUZ**

Bu aşamada kod yazılmıyor.
Sadece proje iskeleti çıkarılıyor.

### **Dosya yapısı:**

```
src/
  app/
    login/
    dashboard/
      forms/
      orders/
  components/
  hooks/
  context/
  lib/
tests/
mocks/
```

### **Mimari kararlar:**

* Login → Client Component
* Dashboard → Server Layout + iç sayfalar Client
* State → Context API
* API → MSW ile tamamen mock
* Test → Jest + RTL + user-event + MSW

Bu proje gelecekte SaaS’a dönüşebilir. Modüler tasarlıyoruz.

---

# **3) IMPLEMENTATION — Kodlama aşaması (Aşama A → B → C)**

Burada hatayı en çok yapan sensin:
Hepsine aynı anda girişmeye çalışıyorsun ve proje çöküyor.

Benim koyduğum **disiplinli sıra**:

1. **Aşama A: Login**
2. **Aşama B: Form Builder (zor modül)**
3. **Aşama C: Order Panel**

Her aşama → önce UI → sonra state → en son test.

Tersine yaparsan boğulursun.

---

# **4) TESTING — Yelpaze değil, cerrahi keskinlik**

Her modülün test kapsamı belli:

### Auth Test Kapsamı

* Input değişimi
* Hatalı form → hata mesajı
* Doğru form → “router.push” mock testi

### Form Builder Test Kapsamı

* Field ekleme
* Field silme
* Field tip değiştirme
* Validasyon
* Custom hook testleri

### Order Panel Test Kapsamı

* API’den data gelmesi
* Filtre çalışması
* Status update
* Context değişimi

Testler “tamamlayıcı” değil, “kriter” olacak.

---

# **5) DEPLOYMENT — Sadece Vercel (MVP için en mantıklı)**

Testler localde çalışır.
Vercel → staging ortamı.
Mock API üretim ortamına taşınmaz.

---

# **6) MAINTENANCE — Minimum yük**

* Testler sayesinde refactor güvenli
* Yeni modül eklemek kolay (dashboard altına klasör aç → test → bitir)

---
