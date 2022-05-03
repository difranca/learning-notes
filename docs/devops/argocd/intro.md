<div align=center>

# Argo CD

<br>
<img width="200" src="devops/argocd/_images/argo.png"/>


Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes.

</div>

> [!NOTE|style:callout|label:More Information|iconVisibility:hidden]
>
> https://argo-cd.readthedocs.io


<br>

## How It Works

- It follows the GitOps pattern of using Git repositories as the source of truth for defining the desired application state
- It is implemented as a Kubernetes controller, which continuously monitors running applications and compares the current, live state against the desired target state

Argo CD has support for multiple config management/templating tools:
- Kustomize
- Helm
- Ksonnet
- Jsonnet
- Plain YAML/JSON manifests
- Custom config management tool

Application deployments can track updates to:
- Branches
- Tags
- Git commit SHA
