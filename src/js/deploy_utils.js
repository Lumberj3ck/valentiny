async function deployToVercel(files, subdomain) {
  const vercelToken = import.meta.env.VITE_VERCEL_TOKEN;
  const teamId = ''; 
  let subname = 'test_deploy'

  const deploymentResponse = await fetch(
    `https://api.vercel.com/v13/deployments${teamId ? `?teamId=${teamId}` : ''}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deploymentId: "dpl_B2pCbmrCnrZS6KdaWfPK9uYFhRF8",
        target:"production",
        name: subname,
        files: files,
        projectSettings: {
          framework: null, 
        },
      }),
    }
  );

  if (!deploymentResponse.ok) {
    throw new Error(`HTTP error! status: ${deploymentResponse.status}`);
  }

  const deploymentData = await deploymentResponse.json();
  const deploymentId = deploymentData.id;

  // Wait for the deployment to complete
  let deploymentStatus;
  let statusData;
  do {
    const statusResponse = await fetch(
      `https://api.vercel.com/v13/deployments/${deploymentId}${teamId ? `?teamId=${teamId}` : ''}`,
      {
        headers: {
          Authorization: `Bearer ${vercelToken}`,
        },
      }
    );

    if (!statusResponse.ok) {
      throw new Error(`HTTP error! status: ${statusResponse.status}`);
    }

    statusData = await statusResponse.json();
    deploymentStatus = statusData.status;
    console.log(deploymentStatus)
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before checking again
  } while (deploymentStatus === 'BUILDING' || deploymentStatus === 'INITIALIZING' || deploymentStatus === 'QUEUED');

  console.log(statusData)
  if (deploymentStatus === 'READY') {
    console.log(`Deployment successful: https://${subdomain}.vercel.app`);
  } else {
    console.error('Deployment failed');
  }
}

export {deployToVercel}