import AppLayout from '@components/Layouts/AppLayout';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return <AppLayout>{children}</AppLayout>;
}
