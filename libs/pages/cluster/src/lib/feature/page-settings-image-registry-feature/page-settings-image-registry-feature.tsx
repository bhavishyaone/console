import { type ContainerRegistryRequest, type ContainerRegistryResponse } from 'qovery-typescript-axios'
import { FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import {
  ContainerRegistryForm,
  useContainerRegistries,
  useEditContainerRegistry,
} from '@qovery/domains/organizations/feature'
import { SettingsHeading } from '@qovery/shared/console-shared'
import { Button, Section } from '@qovery/shared/ui'

export function SettingsImageRegistryFeature({ containerRegistry }: { containerRegistry: ContainerRegistryResponse }) {
  const { organizationId = '' } = useParams()
  const { mutate: editContainerRegistry, isLoading: isLoadingEditContainerRegistry } = useEditContainerRegistry()

  const methods = useForm<ContainerRegistryRequest>({
    mode: 'onChange',
    defaultValues: {
      ...containerRegistry,
    },
  })

  const onSubmit = methods.handleSubmit((containerRegistryRequest) => {
    editContainerRegistry({
      organizationId: organizationId,
      containerRegistryId: containerRegistry.id,
      containerRegistryRequest,
    })
  })

  return (
    <div className="flex w-full flex-col justify-between">
      <Section className="max-w-content-with-navigation-left p-8">
        <SettingsHeading
          title="Image registry"
          description="This image registry is used to store the built images or mirror the container images deployed on this cluster."
        />
        <FormProvider {...methods}>
          <form className="flex flex-col" onSubmit={onSubmit}>
            <ContainerRegistryForm disabledFieldsExceptConfig />
            <div className="mt-2 flex justify-end">
              <Button
                type="submit"
                size="lg"
                loading={isLoadingEditContainerRegistry}
                disabled={!methods.formState.isValid}
              >
                Save
              </Button>
            </div>
          </form>
        </FormProvider>
      </Section>
    </div>
  )
}

export function PageSettingsImageRegistryFeature() {
  const { organizationId = '', clusterId = '' } = useParams()

  const { data: containerRegistries } = useContainerRegistries({
    organizationId,
  })
  const containerRegistry = containerRegistries?.find((registry) => registry.cluster?.id === clusterId)

  return containerRegistry && <SettingsImageRegistryFeature containerRegistry={containerRegistry} />
}

export default PageSettingsImageRegistryFeature
