interface NextIconProps {
  className?: string;
}
export function NextIcon({ className }: NextIconProps) {
  return (
    <div
      className={`text-4xl bg-gray-200 dark:bg-slate-700 w-12 h-12 rounded-full grid place-items-center ${className} `}
    >
      <svg
        width="1rem"
        height="1rem"
        version="1.1"
        id="XMLID_287_"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 24"
        className="fill-current bg-opacity-20"
      >
        <g id="next">
          <g>
            <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12 		" />
          </g>
        </g>
      </svg>
    </div>
  );
}
