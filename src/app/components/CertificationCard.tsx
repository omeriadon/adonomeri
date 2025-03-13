import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/utils/formatDate';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

interface CertificationCardProps {
  name: string;
  provider: string;
  date: string;
  image: string;
  link: string;
}

export default function CertificationCard({
  name,
  provider,
  date,
  image,
  link,
}: CertificationCardProps) {
  return (
    <Link href={link} target="_blank" rel="noopener noreferrer">
      <div className="card-hover cursor-help">
        <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden transition-all duration-300">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className={`text-xl font-bold text-blue-400 mb-2 ${montserrat.className}`}>
          {name}
        </h3>
        <p className="text-gray-300">{provider}</p>
        <p className="text-gray-400 text-sm mt-2">{formatDate(date)}</p>
      </div>
    </Link>
  );
} 