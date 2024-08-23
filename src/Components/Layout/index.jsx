import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return <div className="flex flex-col items-center mt-20">{children}</div>;
};

//fix que tuve que aplicar ya que tiraba error el propTypes
Layout.propTypes = { children: PropTypes.node.isRequired };

export default Layout;
