import { render, screen } from '@testing-library/react'

// import Home from '../pages/index'    // for Pages Router
import BasicTables from '@/app/(admin)/(others-pages)/(tables)/tenants/page' // for App Router, using alias to import

// The custom matchers from jest-dom (like toBeInTheDocument) are available globally if jest.setup is configured
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
}))
describe('Home component', () => {
  it('renders a heading', () => {
    render(<BasicTables />)
    expect(screen.getByText('Tenants Table')).toBeInTheDocument()
  })
})
