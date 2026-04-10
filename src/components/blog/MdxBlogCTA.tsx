import BlogCTA from "../BlogCTA";

type MdxBlogCTAProps = {
  gradient?: string;
};

export default function MdxBlogCTA({
  gradient = "from-[#17385f] to-[#9062ae]",
}: MdxBlogCTAProps) {
  return (
    <div className="my-10">
      <BlogCTA gradient={gradient} />
    </div>
  );
}
