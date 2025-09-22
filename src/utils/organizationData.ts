export interface OrganizationData {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  acronym: string;
  headerImage?: string;
}

export const getOrganizationDataFromPath = (pathname: string): OrganizationData => {
  if (pathname.startsWith('/stanford/') || pathname === '/stanford') {
    return {
      name: "Stanford University",
      primaryColor: "#8C1515",
      secondaryColor: "#B1040E",
      acronym: "stanford",
      headerImage: "/images/organizations/stanford.jpg"
    };
  } else if (pathname.startsWith('/techcorp/') || pathname === '/techcorp') {
    return {
      name: "TechCorp Training",
      primaryColor: "#0066CC",
      secondaryColor: "#004499",
      acronym: "techcorp",
      headerImage: "/images/organizations/techcorp.jpg"
    };
  } else if (pathname.startsWith('/algoristics/') || pathname === '/algoristics') {
    return {
      name: "Algoristics",
      primaryColor: "#3B82F6",
      secondaryColor: "#1D4ED8",
      acronym: "algoristics",
      headerImage: "/images/organizations/algoristics.jpg"
    };
  } else if (pathname.startsWith('/citycollege/') || pathname === '/citycollege') {
    return {
      name: "City Community College",
      primaryColor: "#228B22",
      secondaryColor: "#32CD32",
      acronym: "citycollege",
      headerImage: "/images/organizations/citycollege.jpg"
    };
  } else {
    return {
      name: "Organization",
      primaryColor: "#3B82F6",
      secondaryColor: "#1D4ED8",
      acronym: "organization"
    };
  }
};