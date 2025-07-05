import { AnimatedTabs } from "./animated-tabs";

export const Preview = () => {
  const compactTabs = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Overview Dashboard</h3>
          <p className="text-muted-foreground">
            Welcome to your dashboard overview. Here you can see a summary of
            your account activity and important metrics.
          </p>
        </div>
      ),
    },
    {
      id: "analytics",
      label: "Analytics",
      content: (
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Analytics</h3>
          <p className="text-muted-foreground">
            Detailed analytics and insights about your usage patterns and
            performance metrics.
          </p>
        </div>
      ),
    },
    {
      id: "reports",
      label: "Reports",
      content: (
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Reports</h3>
          <p className="text-muted-foreground">
            Generate and view comprehensive reports about your data and
            activities.
          </p>
        </div>
      ),
    },
    {
      id: "config",
      label: "Config",
      content: (
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Configuration</h3>
          <p className="text-muted-foreground">
            Configure your application settings and preferences.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Compact Version</h2>
      <AnimatedTabs tabs={compactTabs} defaultTab="overview" />
    </div>
  );
};

export const PreviewCode = `
import { AnimatedTabs } from "./animated-tabs";

export const Preview = () => {
  const compactTabs = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Overview Dashboard</h3>
          <p className="text-muted-foreground">
            Welcome to your dashboard overview. Here you can see a summary of
            your account activity and important metrics.
          </p>
        </div>
      ),
    },
    {
      id: "analytics",
      label: "Analytics",
      content: (
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Analytics</h3>
          <p className="text-muted-foreground">
            Detailed analytics and insights about your usage patterns and
            performance metrics.
          </p>
        </div>
      ),
    },
    {
      id: "reports",
      label: "Reports",
      content: (
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Reports</h3>
          <p className="text-muted-foreground">
            Generate and view comprehensive reports about your data and
            activities.
          </p>
        </div>
      ),
    },
    {
      id: "config",
      label: "Config",
      content: (
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Configuration</h3>
          <p className="text-muted-foreground">
            Configure your application settings and preferences.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Compact Version</h2>
      <AnimatedTabs tabs={compactTabs} defaultTab="overview" />
    </div>
  );
};
`;
