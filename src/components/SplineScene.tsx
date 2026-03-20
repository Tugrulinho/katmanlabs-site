interface SplineSceneProps {
  className?: string;
}

export default function SplineScene({ className = '' }: SplineSceneProps) {
  return (
    <div className={`absolute top-0 -right-[5%] h-full w-full lg:w-[65%] z-10 ${className}`}>
      <hana-viewer
        url="https://prod.spline.design/qX4LoQu5MgXiSwdT-czf/scene.hanacode"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: 'grab'
        }}
      />
    </div>
  );
}
