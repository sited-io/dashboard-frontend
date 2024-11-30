job "dashboard-frontend" {
  datacenters = ["dc1"]
  type        = "service"

  group "dashboard-frontend" {
    count = 2

    network {
      mode = "bridge"

      port "http" {}
    }

    service {
      name = "dashboard-frontend"
      port = "http"

      connect {
        sidecar_service {}
      }

      check {
        type     = "http"
        port     = "http"
        path     = "/"
        interval = "20s"
        timeout  = "2s"
      }
    }

    task "dashboard-frontend" {
      driver = "docker"

      resources {
        cpu        = 100
        memory     = 256
        memory_max = 256
      }

      vault {
        policies = ["service-dashboard-frontend"]
      }

      template {
        destination = "${NOMAD_SECRETS_DIR}/.env"
        env = true
        change_mode = "restart"
        data = <<EOF
PORT={{ env "NOMAD_PORT_http" }}
{{ with secret "kv2/data/services/dashboard-frontend" }}
OAUTH_URL='{{ .Data.data.OAUTH_URL }}'
OAUTH_ORG_ID='{{ .Data.data.OAUTH_ORG_ID }}'
SESSION_SECRET='{{ .Data.data.SESSION_SECRET }}'
{{ end }}
EOF
      }

      config {
        image = "__IMAGE__"
        force_pull = true
      }
    }
  }
}
