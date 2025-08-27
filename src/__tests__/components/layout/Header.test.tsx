import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Header } from '@/components/layout/Header'

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Bell: () => <div data-testid="bell-icon" />,
  Settings: () => <div data-testid="settings-icon" />,
  User: () => <div data-testid="user-icon" />,
  Moon: () => <div data-testid="moon-icon" />,
  Sun: () => <div data-testid="sun-icon" />
}))

describe('Header', () => {
  beforeEach(() => {
    // Clear any classes on document element before each test
    document.documentElement.className = ''
  })

  it('renders the header with title and status indicator', () => {
    render(<Header />)
    
    expect(screen.getByText('Learn APIs Step by Step')).toBeInTheDocument()
    expect(screen.getByText('Interactive Learning')).toBeInTheDocument()
  })

  it('renders all navigation buttons', () => {
    render(<Header />)
    
    expect(screen.getByTitle('Toggle dark mode')).toBeInTheDocument()
    expect(screen.getByTestId('bell-icon')).toBeInTheDocument()
    expect(screen.getByTestId('settings-icon')).toBeInTheDocument()
    expect(screen.getByTestId('user-icon')).toBeInTheDocument()
    expect(screen.getByText('Student')).toBeInTheDocument()
  })

  it('toggles dark mode when dark mode button is clicked', () => {
    render(<Header />)
    
    const darkModeButton = screen.getByTitle('Toggle dark mode')
    
    // Initially should show moon icon (light mode)
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    
    // Click to toggle to dark mode
    fireEvent.click(darkModeButton)
    
    // Should now show sun icon (dark mode)
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    
    // Click again to toggle back to light mode
    fireEvent.click(darkModeButton)
    
    // Should show moon icon again
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('displays notification badge', () => {
    render(<Header />)
    
    const notificationButton = screen.getByTestId('bell-icon').closest('button')
    const badge = notificationButton?.querySelector('span')
    
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-red-500')
  })

  it('has proper accessibility attributes', () => {
    render(<Header />)
    
    const darkModeButton = screen.getByTitle('Toggle dark mode')
    expect(darkModeButton).toBeInTheDocument()
    
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })
})