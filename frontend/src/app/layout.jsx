// app/layout.js
export const metadata = {
    title: 'Redirecting...',
};

export default function RootLayout({ children }) {
    return <html><body>{children}</body></html>;
}
