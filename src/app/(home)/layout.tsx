import { Container } from '@/layouts/home/slots/container';

export default function Layout({ children }: LayoutProps<'/'>) {
  return <Container>{children}</Container>;
}
