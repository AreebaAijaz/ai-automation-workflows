import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'about-footer': "url('/Image (4).png')"
  		},
  		container: {
  			center: true,
  			padding: {
  				DEFAULT: '20px',
  				md: '40px'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Satoshi',
  				'sans-serif'
  			],
  			display: [
  				'Clash Display',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			'custom-h1': [
  				'36px',
  				{
  					lineHeight: '140%'
  				}
  			],
  			'custom-h2': [
  				'32px',
  				{
  					lineHeight: '140%'
  				}
  			],
  			'custom-h3': [
  				'24px',
  				{
  					lineHeight: '140%'
  				}
  			],
  			'custom-h4': [
  				'20px',
  				{
  					lineHeight: '140%'
  				}
  			],
  			'custom-h5': [
  				'16px',
  				{
  					lineHeight: '140%'
  				}
  			],
  			'custom-h6': [
  				'14px',
  				{
  					lineHeight: '140%'
  				}
  			],
  			'body-sm': [
  				'14px',
  				{
  					lineHeight: '150%'
  				}
  			],
  			'body-md': [
  				'16px',
  				{
  					lineHeight: '150%'
  				}
  			],
  			'body-lg': [
  				'18px',
  				{
  					lineHeight: '150%'
  				}
  			],
  			'satoshi-regular': [
  				'16px',
  				{
  					lineHeight: '150%'
  				}
  			],
  			'clash-regular': [
  				'24px',
  				{
  					lineHeight: '140%'
  				}
  			]
  		},
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'dark-primary': '#2A254B',
  			'white': '#FFFFFF',
  			'light-grey': '#F9F9F9',
  			'border-grey': '#EBE8F4',
  			'border-dark': '#CAC6DA',
  			nav: '#726E8D',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
