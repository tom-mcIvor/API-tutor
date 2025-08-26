import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { CodeExample } from '@/types'

// Mock navigator.clipboard
const mockWriteText = jest.fn()

describe('CodeBlock', () => {
  const basicCodeExample: CodeExample = {
    id: 'test-example',
    language: 'javascript',
    code: 'console.log("Hello, World!");'
  }

  const codeExampleWithMetadata: CodeExample = {
    id: 'detailed-example',
    language: 'typescript',
    title: 'Example Function',
    description: 'A simple function that adds two numbers',
    code: 'function add(a: number, b: number): number {\n  return a + b;\n}',
    output: '// Returns the sum of a and b',
    editable: true
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Mock clipboard for each test
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText
      },
      writable: true,
      configurable: true
    })
  })

  describe('Basic Rendering', () => {
    it('should render code block with basic example', () => {
      render(<CodeBlock example={basicCodeExample} />)
      
      expect(screen.getByText('javascript')).toBeInTheDocument()
      expect(screen.getByText('console.log("Hello, World!");')).toBeInTheDocument()
      expect(screen.getByText('Copy')).toBeInTheDocument()
    })

    it('should render title and description when provided', () => {
      render(<CodeBlock example={codeExampleWithMetadata} />)
      
      expect(screen.getByText('Example Function')).toBeInTheDocument()
      expect(screen.getByText('A simple function that adds two numbers')).toBeInTheDocument()
    })

    it('should render output section when showOutput is true and output exists', () => {
      render(<CodeBlock example={codeExampleWithMetadata} showOutput={true} />)
      
      expect(screen.getByText('Output')).toBeInTheDocument()
      expect(screen.getByText('// Returns the sum of a and b')).toBeInTheDocument()
    })

    it('should not render output section when showOutput is false', () => {
      render(<CodeBlock example={codeExampleWithMetadata} showOutput={false} />)
      
      expect(screen.queryByText('Output')).not.toBeInTheDocument()
      expect(screen.queryByText('// Returns the sum of a and b')).not.toBeInTheDocument()
    })

    it('should not render output section when no output provided', () => {
      render(<CodeBlock example={basicCodeExample} showOutput={true} />)
      
      expect(screen.queryByText('Output')).not.toBeInTheDocument()
    })

    it('should show run button when example is editable', () => {
      render(<CodeBlock example={codeExampleWithMetadata} />)
      
      expect(screen.getByText('Run')).toBeInTheDocument()
    })

    it('should not show run button when example is not editable', () => {
      render(<CodeBlock example={basicCodeExample} />)
      
      expect(screen.queryByText('Run')).not.toBeInTheDocument()
    })
  })

  describe('Copy Functionality', () => {
    it('should copy code to clipboard when copy button is clicked', async () => {
      mockWriteText.mockResolvedValue(undefined)
      
      render(<CodeBlock example={basicCodeExample} />)
      
      const copyButton = screen.getByRole('button', { name: /copy/i })
      fireEvent.click(copyButton)
      
      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith(basicCodeExample.code)
      })
    })

    it('should show "Copied!" confirmation after successful copy', async () => {
      mockWriteText.mockResolvedValue(undefined)
      
      render(<CodeBlock example={basicCodeExample} />)
      
      const copyButton = screen.getByRole('button', { name: /copy/i })
      fireEvent.click(copyButton)
      
      await waitFor(() => {
        expect(screen.getByText('Copied!')).toBeInTheDocument()
      })
      expect(screen.queryByText('Copy')).not.toBeInTheDocument()
    })

    it('should revert to "Copy" text after 2 seconds', async () => {
      mockWriteText.mockResolvedValue(undefined)
      
      render(<CodeBlock example={basicCodeExample} />)
      
      const copyButton = screen.getByRole('button', { name: /copy/i })
      fireEvent.click(copyButton)
      
      await waitFor(() => {
        expect(screen.getByText('Copied!')).toBeInTheDocument()
      })
      
      // Wait for the timeout to reset the copied state
      await waitFor(() => {
        expect(screen.getByText('Copy')).toBeInTheDocument()
      }, { timeout: 3000 })
      
      expect(screen.queryByText('Copied!')).not.toBeInTheDocument()
    })

    it('should handle copy failure gracefully', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
      mockWriteText.mockRejectedValue(new Error('Copy failed'))
      
      render(<CodeBlock example={basicCodeExample} />)
      
      const copyButton = screen.getByRole('button', { name: /copy/i })
      fireEvent.click(copyButton)
      
      await waitFor(() => {
        expect(consoleError).toHaveBeenCalledWith('Failed to copy code:', expect.any(Error))
      })
      expect(screen.queryByText('Copied!')).not.toBeInTheDocument()
      
      consoleError.mockRestore()
    })
  })

  describe('Run Functionality', () => {
    it('should change button text to "Running..." when clicked', async () => {
      const user = userEvent.setup()
      
      render(<CodeBlock example={codeExampleWithMetadata} />)
      
      const runButton = screen.getByRole('button', { name: /run/i })
      await user.click(runButton)
      
      expect(screen.getByText('Running...')).toBeInTheDocument()
    })

    it('should disable run button while running', async () => {
      const user = userEvent.setup()
      
      render(<CodeBlock example={codeExampleWithMetadata} />)
      
      const runButton = screen.getByRole('button', { name: /run/i })
      await user.click(runButton)
      
      expect(runButton).toBeDisabled()
    })

    it('should revert to "Run" after execution completes', async () => {
      const user = userEvent.setup()
      
      render(<CodeBlock example={codeExampleWithMetadata} />)
      
      const runButton = screen.getByRole('button', { name: /run/i })
      await user.click(runButton)
      
      expect(screen.getByText('Running...')).toBeInTheDocument()
      
      // Wait for the timeout to complete
      await waitFor(() => {
        expect(screen.getByText('Run')).toBeInTheDocument()
      }, { timeout: 1500 })
      
      expect(runButton).not.toBeDisabled()
    })
  })

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      render(<CodeBlock example={codeExampleWithMetadata} />)
      
      const codeElement = screen.getByRole('code')
      expect(codeElement).toBeInTheDocument()
      
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2) // Copy and Run buttons
    })

    it('should have accessible button labels', () => {
      render(<CodeBlock example={codeExampleWithMetadata} />)
      
      expect(screen.getByRole('button', { name: /run/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument()
    })
  })

  describe('Styling and Layout', () => {
    it('should apply proper CSS classes for styling', () => {
      const { container } = render(<CodeBlock example={basicCodeExample} />)
      
      expect(container.querySelector('.border')).toBeInTheDocument()
      expect(container.querySelector('.rounded-lg')).toBeInTheDocument()
      expect(container.querySelector('.overflow-hidden')).toBeInTheDocument()
    })

    it('should have proper code formatting with pre and code elements', () => {
      render(<CodeBlock example={basicCodeExample} />)
      
      const preElement = screen.getByRole('code').closest('pre')
      expect(preElement).toHaveClass('bg-gray-900', 'text-gray-100', 'p-4', 'overflow-x-auto', 'text-sm')
    })

    it('should display language label', () => {
      render(<CodeBlock example={codeExampleWithMetadata} />)
      
      expect(screen.getByText('typescript')).toHaveClass('text-sm', 'text-gray-300', 'font-mono')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty code', () => {
      const emptyCodeExample: CodeExample = {
        id: 'empty',
        language: 'javascript',
        code: ''
      }
      
      render(<CodeBlock example={emptyCodeExample} />)
      
      expect(screen.getByText('javascript')).toBeInTheDocument()
      expect(screen.getByRole('code')).toBeInTheDocument()
    })

    it('should handle very long code', () => {
      const longCodeExample: CodeExample = {
        id: 'long',
        language: 'javascript',
        code: 'const longVariable = ' + '"very long string".repeat(100);'
      }
      
      render(<CodeBlock example={longCodeExample} />)
      
      expect(screen.getByRole('code')).toBeInTheDocument()
      expect(screen.getByText(/longVariable/)).toBeInTheDocument()
    })

    it('should handle multiline code properly', () => {
      const multilineExample: CodeExample = {
        id: 'multiline',
        language: 'javascript',
        code: 'function test() {\n  console.log("line 1");\n  console.log("line 2");\n}'
      }
      
      render(<CodeBlock example={multilineExample} />)
      
      expect(screen.getByText(/function test/)).toBeInTheDocument()
      expect(screen.getByText(/line 1/)).toBeInTheDocument()
      expect(screen.getByText(/line 2/)).toBeInTheDocument()
    })
  })
})