export const SectionContainer: React.FC<{ id?: string }> = ({
  id,
  children,
}) => {
  return (
    <>
      <section id={id} className="p-6">
        {children}
      </section>
    </>
  );
};
