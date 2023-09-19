import classNames from 'classnames';
import Image from 'next/image';

type Props = {
  image?: string;
  title?: string;
  description?: string;
};

export const Banner = ({ image, title, description }: Props) => {
  return (
    <div className="relative">
      {/* Decorative image and overlay */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        {image && (
          <>
            <Image
              alt={title || ''}
              className="h-full w-full object-cover object-center"
              fill
              src={image}
            />
          </>
        )}

        <div
          aria-hidden="true"
          className={classNames('absolute inset-0  opacity-50 ', {
            'bg-gradient-to-t from-gray-800': !image,
            'bg-gray-900': image,
          })}
        />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0 ">
        <h1 className="bg-white/1 text-4xl font-bold tracking-tight text-white backdrop-blur-sm lg:text-6xl">
          {title}
        </h1>
        <p className="bg-white/1 blend mt-4 text-xl text-white backdrop-blur-sm">
          {description}
        </p>
        <a
          className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
          href={`/products?collection=${title}`}
        >
          Shop {title}
        </a>
      </div>
    </div>
  );
};
