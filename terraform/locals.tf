locals {
  domain = "bernsonfamily.net"

  environment = replace(var.environment, "_", "-")

  site_domain = "stories.${local.domain}"
}