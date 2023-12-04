import Image from 'next/image';

interface BannerProps {
    img: string;
}

const Banner: React.FC<BannerProps> = ({ img }: BannerProps) => {
    return (
        <div
            style={{
                width: '100%',
                maxWidth: '600px',
                maxHeight: '240px',
                objectFit: 'cover',
                marginTop: '15px',
                marginBottom: '15px',
                borderRadius: '10px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                overflow: 'hidden',
            }}
        >
            <Image
                src={img}
                alt="Logo"
                layout="responsive"
                width={500}
                height={200}
            />
        </div>
    );
};

export default Banner;
