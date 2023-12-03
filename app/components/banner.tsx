import Image from 'next/image';

const Banner = () => {
    return (
        <div
            style={{
                width: '100%',
                maxWidth: '500px',
                maxHeight: '200px',
                objectFit: 'cover',
                marginTop: '15px',
                borderRadius: '10px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                overflow: 'hidden',
            }}
        >
            <Image
                src="/images/header.png"
                alt="Logo"
                layout="responsive"
                width={500}
                height={200}
            />
        </div>
    );
};

export default Banner;
