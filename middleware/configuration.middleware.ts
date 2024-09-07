const environmentVariables: string[] = [];

const appMiddleware = () => {
  const missingEnvs = environmentVariables?.reduce((acc: string[], curr) => {
    if (!process.env[curr]) {
      acc.push(curr);
    }
    return acc;
  }, []);

  if (missingEnvs?.length > 0) {
    console.error(`Missing Environment Variables : ${missingEnvs}`);
    process.exit(1);
  }
};

export default appMiddleware;
