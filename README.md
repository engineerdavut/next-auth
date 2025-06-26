# Next.js & Auth0: Gelişmiş Kimlik Doğrulama Sistemi

Bu proje, Auth0 ile OAuth 2.0 entegrasyonu, JWT tabanlı oturum yönetimi ve rol bazlı yetkilendirme (RBAC) özelliklerini barındıran modern bir kimlik doğrulama altyapısıdır. Next.js 14 (App Router) üzerine inşa edilmiş olup, SOLID ve 12-Factor App prensiplerine uygun olarak geliştirilmiştir.

## ✨ Özellikler

-   **Güvenli Kimlik Doğrulama:** Auth0 üzerinden sosyal ve e-posta/parola ile giriş.
-   **JWT Oturum Yönetimi:** `next-auth` ile sunucu ve istemci tarafında güvenli oturum kontrolü.
-   **Sayfa Koruma:** Next.js Middleware kullanılarak belirli sayfaların sadece giriş yapmış kullanıcılara açık olması.
-   **Rol Bazlı Yetkilendirme (RBAC):** `admin` ve `user` rolleri ile farklı yetki seviyelerinde sayfa erişimi.
-   **Modern Teknoloji Yığını:** Next.js 14, TypeScript, TailwindCSS ve Bun.
-   **Docker Desteği:** Üretime hazır, optimize edilmiş Docker imajı.

## 🚀 Teknolojiler

-   **Framework:** [Next.js](https://nextjs.org/) 14 (App Router)
-   **Runtime:** [Bun](https://bun.sh/)
-   **Kimlik Doğrulama:** [Auth0](https://auth0.com/) & [NextAuth.js](https://next-auth.js.org/)
-   **Dil:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [TailwindCSS](https://tailwindcss.com/)
-   **Containerization:** [Docker](https://www.docker.com/)

---

## 📂 Proje Yapısı

Projenin temel dosya ve klasör yapısı aşağıda özetlenmiştir.

```
.
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth'ın tüm auth isteklerini yakaladığı yer
│   ├── admin/page.tsx                   # Sadece 'admin' rolüne sahip kullanıcıların erişebildiği sayfa
│   ├── user/page.tsx                    # Giriş yapmış tüm kullanıcıların erişebildiği sayfa
│   ├── profile/page.tsx                 # Korumalı kullanıcı profili sayfası
│   ├── lib/auth.ts                      # (Opsiyonel) Auth ile ilgili yardımcı fonksiyonlar
│   ├── types/next-auth.d.ts             # NextAuth Session ve JWT tiplerini genişletmek için
│   ├── components/                      # UI Bileşenleri (AuthProvider, AuthButtons)
│   ├── layout.tsx                       # Ana layout
│   └── page.tsx                         # Ana sayfa
├── .dockerignore
├── .env.local                           # Yerel ortam değişkenleri (Git'e gönderilmez)
├── .gitignore
├── Dockerfile                           # Üretim için Docker imajı oluşturma talimatları
├── bun.lockb
├── middleware.ts                        # Sayfa koruması için Next.js middleware
└── README.md
```

---

## 🏁 Başlarken

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### Gereksinimler

-   [Node.js](https://nodejs.org/en/) (v18 veya üstü)
-   [Bun](https://bun.sh/docs/installation)
-   [Docker](https://www.docker.com/products/docker-desktop/) (isteğe bağlı, Docker ile çalıştırmak için)
-   Bir [Auth0](https://auth0.com/) hesabı

### Kurulum Adımları

1.  **Projeyi Klonlayın:**
    ```bash
    git clone https://github.com/KULLANICI-ADIN/next-auth-project.git
    cd next-auth-project
    ```

2.  **Auth0 Ayarları:**
    -   Auth0 dashboard'da yeni bir **Regular Web Application** oluşturun.
    -   **Settings** bölümünden `Domain`, `Client ID` ve `Client Secret` bilgilerini alın.
    -   **Allowed Callback URLs** kısmına `http://localhost:3000/api/auth/callback/auth0` ekleyin.
    -   **Allowed Logout URLs** kısmına `http://localhost:3000` ekleyin.

3.  **Ortam Değişkenlerini Ayarlayın:**
    Proje kök dizininde `.env.local` adında bir dosya oluşturun ve Auth0'dan aldığınız bilgilerle doldurun.

    ```.env.local
        # Auth0 Değişkenleri
        AUTH0_CLIENT_ID=Your_Auth0_Client_ID
        AUTH0_CLIENT_SECRET=Your_Auth0_Client_Secret
        AUTH0_ISSUER=Your_Auth0_Issuer

        # NextAuth Secret
        # Terminalde "openssl rand -base64 32" komutu ile üretebilirsin
        AUTH_SECRET=Your_Auth_Secret

        NEXTAUTH_URL=Your_Nextauth_Url
    ```

4.  **Bağımlılıkları Yükleyin:**
    ```bash
    bun install
    ```

5.  **Geliştirme Sunucusunu Başlatın:**
    ```bash
    bun run dev
    ```
    Uygulama artık [`http://localhost:3000`](http://localhost:3000) adresinde çalışıyor olmalı.

---

## 🐳 Docker ile Çalıştırma

Proje, üretime hazır bir `Dockerfile` içerir.

1.  **Docker İmajını Oluşturun:**
    ```bash
    docker build -t next-auth-app .
    ```

2.  **Container'ı Başlatın:**
    Docker için ortam değişkenlerini içeren bir `docker.env` dosyası oluşturun (`.env.local` içeriğini kopyalayabilirsiniz).

    ```bash
    docker run --rm -p 3000:3000 --env-file docker.env --name final-app next-auth-app
    ```
    Uygulama artık Docker container'ı içinde [`http://localhost:3000`](http://localhost:3000) adresinde çalışacaktır.
