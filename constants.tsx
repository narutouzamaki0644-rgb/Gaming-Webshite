
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'CyberPower X-100',
    category: 'Prebuilt',
    price: 2499.99,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800',
    description: 'High-performance gaming beast with RTX 4090 and i9-14900K.',
    specs: { GPU: 'RTX 4090', CPU: 'i9-14900K', RAM: '64GB DDR5', Storage: '2TB NVMe' }
  },
  {
    id: 'p2',
    name: 'ROG Strix GeForce RTX 4080',
    category: 'GPU',
    price: 1199.99,
    image: 'https://images.unsplash.com/photo-1616149549014-550edd17055a?auto=format&fit=crop&q=80&w=800',
    description: 'Elevated cooling and robust power delivery to fuel frames.',
    specs: { VRAM: '16GB GDDR6X', Interface: 'PCIe 4.0', Clock: '2.5GHz' }
  },
  {
    id: 'p3',
    name: 'Ryzen 9 7950X',
    category: 'CPU',
    price: 549.99,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate processor for gamers and creators alike.',
    specs: { Cores: '16', Threads: '32', Boost: '5.7GHz' }
  },
  {
    id: 'p4',
    name: 'Corsair Vengeance RGB 32GB',
    category: 'RAM',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=800',
    description: 'Optimized performance for DDR5 compatible motherboards.',
    specs: { Capacity: '32GB (2x16GB)', Speed: '6000MHz', Latency: 'CL30' }
  },
  {
    id: 'p5',
    name: 'Lian Li PC-O11 Dynamic',
    category: 'Case',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1591489378430-ef2f4c626b35?auto=format&fit=crop&q=80&w=800',
    description: 'Modular dual chamber case for high-end builds.',
    specs: { FormFactor: 'ATX', Window: 'Tempered Glass', Color: 'Black' }
  },
  {
    id: 'p6',
    name: 'Samsung 990 Pro 2TB',
    category: 'Storage',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1597872200382-0bf5fc3f5d50?auto=format&fit=crop&q=80&w=800',
    description: 'Reach the near-max performance of PCIe 4.0.',
    specs: { Read: '7450MB/s', Write: '6900MB/s', Interface: 'NVMe Gen4' }
  }
];
