
import React, { Suspense, useRef } from 'react' import { Canvas, useFrame } from '@react-three/fiber' import { OrbitControls, Float, Html, softShadows } from '@react-three/drei' import { motion } from 'framer-motion'

softShadows()

// --- 3D Nut components (stylized primitives you can replace with GLTF models) --- function Almond({ position = [0, 0, 0], color = '#B87C48', scale = 1 }) { const ref = useRef() useFrame((state, delta) => { ref.current.rotation.y += delta * 0.3 ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.05 }) return ( <mesh ref={ref} position={position} scale={scale} castShadow> <sphereGeometry args={[0.6, 32, 32]} /> <meshStandardMaterial metalness={0.2} roughness={0.45} color={color} /> </mesh> ) }

function Cashew({ position = [0, 0, 0], color = '#E8C78A', scale = 1 }) { const ref = useRef() useFrame((state) => { ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.9) * 0.25 }) return ( <mesh ref={ref} position={position} scale={scale} castShadow> <torusGeometry args={[0.5, 0.22, 24, 48]} /> <meshStandardMaterial metalness={0.05} roughness={0.6} color={color} /> </mesh> ) }

// --- Scene wrapper --- function HeroScene() { return ( <Canvas shadows camera={{ position: [0, 1.5, 6], fov: 45 }} style={{ height: '520px' }}> <ambientLight intensity={0.6} /> <directionalLight position={[5, 10, 5]} intensity={1} castShadow /> <spotLight position={[-10, 10, -10]} angle={0.3} intensity={0.4} />

<Suspense fallback={null}>
    <Float floatIntensity={1} rotationIntensity={0.6}>
      <Almond position={[-1.6, 0.2, 0]} scale={1.0} />
      <Cashew position={[0.3, 0.5, 0]} scale={1.1} />
      <Almond position={[1.6, -0.1, 0]} color={'#C68A4B'} scale={0.95} />
    </Float>
  </Suspense>

  <Html fullscreen style={{ pointerEvents: 'none' }}>
    {/* This is intentionally empty — scene is purely visual. */}
  </Html>

  <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
</Canvas>

) }

// --- UI components --- function Header() { return ( <header className="w-full fixed top-0 left-0 z-40 bg-gradient-to-b from-white/70 via-white/40 to-transparent backdrop-blur-md"> <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"> <div className="flex items-center gap-3"> <div className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center shadow-md">DF</div> <div> <h1 className="text-lg font-semibold">Pristine DryFruits</h1> <p className="text-xs text-gray-500 -mt-1">Premium, Natural & Fresh</p> </div> </div>

<div className="hidden md:flex items-center gap-6">
      <a href="#products" className="text-sm hover:text-amber-600">Products</a>
      <a href="#about" className="text-sm hover:text-amber-600">About</a>
      <a href="#contact" className="text-sm hover:text-amber-600">Contact</a>
      <button className="ml-2 px-4 py-2 rounded-full bg-amber-600 text-white text-sm shadow hover:brightness-105">Shop Now</button>
    </div>

    <div className="md:hidden">
      <button className="px-3 py-2 rounded bg-gray-100">Menu</button>
    </div>
  </nav>
</header>

) }

function Hero() { return ( <section className="pt-28 bg-gradient-to-b from-amber-50 to-white"> <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"> <div className="space-y-6"> <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-extrabold leading-tight"> Nature's Best Dry Fruits — <span className="text-amber-600">Handpicked & Premium</span> </motion.h2>

<motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-600">
        Sourced from trusted farms, sorted and packed with love. Explore our curated collection of almonds, cashews, pistachios, and mixed assortments — perfect for gifting and everyday nutrition.
      </motion.p>

      <div className="flex gap-3">
        <motion.a whileHover={{ scale: 1.03 }} href="#products" className="inline-block px-6 py-3 rounded-full bg-amber-600 text-white font-medium shadow">Shop Collection</motion.a>
        <motion.a whileHover={{ scale: 1.03 }} href="#about" className="inline-block px-6 py-3 rounded-full border border-amber-600 text-amber-600">Our Story</motion.a>
      </div>

      <div className="mt-4 flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center">🏆</div>
          <div>
            <p className="text-sm font-medium">ISO Certified</p>
            <p className="text-xs text-gray-500">Hygienic Packaging</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center">🚚</div>
          <div>
            <p className="text-sm font-medium">Fast Delivery</p>
            <p className="text-xs text-gray-500">All over India</p>
          </div>
        </div>
      </div>
    </div>

    <div className="w-full rounded-3xl overflow-hidden bg-white/60 shadow-lg">
      <HeroScene />
    </div>
  </div>
</section>

) }

function ProductCard({ name, price, desc }) { return ( <motion.div whileHover={{ y: -6 }} className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow"> <div className="h-44 rounded-xl bg-amber-50 flex items-center justify-center mb-4"> {/* Replace with product image or GLTF viewer in production */} <div className="text-6xl">🥜</div> </div> <h3 className="font-semibold">{name}</h3> <p className="text-sm text-gray-500 mt-1">{desc}</p> <div className="mt-4 flex items-center justify-between"> <div className="text-lg font-bold">₹{price}</div> <button className="px-3 py-1 rounded-full bg-amber-600 text-white text-sm">Add</button> </div> </motion.div> ) }

function Products() { const items = [ { name: 'Premium Almonds', price: 499, desc: 'California style, crunchy & fresh' }, { name: 'Royal Cashews', price: 699, desc: 'Lightly roasted, buttery taste' }, { name: 'Green Pistachios', price: 599, desc: 'Naturally green & flavoursome' }, { name: 'Super Mix (250g)', price: 399, desc: 'Almonds, Cashews, Raisins & more' }, ]

return ( <section id="products" className="py-16 bg-white"> <div className="max-w-6xl mx-auto px-6"> <h3 className="text-2xl font-bold mb-6">Best Sellers</h3> <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> {items.map((it) => ( <ProductCard key={it.name} {...it} /> ))} </div> </div> </section> ) }

function About() { return ( <section id="about" className="py-16 bg-amber-50"> <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"> <div> <h3 className="text-3xl font-bold">Our Story</h3> <p className="mt-4 text-gray-700">Founded with a mission to bring pure, traceable dry fruits to every household. We work directly with growers, enforce strict quality checks, and pack in hygienic facilities. Our products are non-GMO and packaged with recyclable materials.</p>

<ul className="mt-6 space-y-3">
        <li className="flex gap-3 items-start">
          <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">🌱</div>
          <div>
            <div className="font-semibold">Sustainably Sourced</div>
            <div className="text-xs text-gray-500">Fair-trade partnerships with farmers</div>
          </div>
        </li>

        <li className="flex gap-3 items-start">
          <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">🔬</div>
          <div>
            <div className="font-semibold">Lab Tested</div>
            <div className="text-xs text-gray-500">Quality checks at every step</div>
          </div>
        </li>
      </ul>
    </div>

    <div className="rounded-xl overflow-hidden shadow-lg">
      <img alt="packing" src="https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" className="w-full h-full object-cover" />
    </div>
  </div>
</section>

) }

function Contact() { return ( <section id="contact" className="py-16 bg-white"> <div className="max-w-4xl mx-auto px-6"> <h3 className="text-2xl font-bold mb-4">Get In Touch</h3> <p className="text-gray-600 mb-6">Questions about wholesale, gifts or custom packaging? Drop us a message.</p>

<form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input aria-label="name" placeholder="Your name" className="p-3 rounded-md border" />
      <input aria-label="email" placeholder="Email address" className="p-3 rounded-md border" />
      <input aria-label="subject" placeholder="Subject" className="p-3 rounded-md border md:col-span-2" />
      <textarea aria-label="message" placeholder="Message" className="p-3 rounded-md border md:col-span-2 h-28" />
      <div className="md:col-span-2">
        <button type="submit" className="px-6 py-3 rounded-full bg-amber-600 text-white">Send Message</button>
      </div>
    </form>
  </div>
</section>

) }

function Footer() { return ( <footer className="bg-amber-900 text-white py-8 mt-12"> <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4"> <div> <div className="font-bold">Pristine DryFruits</div> <div className="text-sm text-amber-200">© {new Date().getFullYear()} All rights reserved</div> </div> <div className="text-sm">Made with ❤️ — Packaged with care</div> </div> </footer> ) }

export default function App() { return ( <div className="min-h-screen bg-white text-gray-800 antialiased"> <Header /> <main> <Hero /> <Products /> <About /> <Contact /> </main> <Footer /> </div> ) }