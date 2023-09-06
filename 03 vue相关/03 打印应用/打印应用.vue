<template>
  <div class="report-export">
    <div
      :class="{
        'hidden-print': hidden
      }"
    >
      <div :id="`element-to-print-${exportMethod}`" class="export-container-wrapper">
        <export-container v-if="singleReports.BaseReport">
          <base-report
            :info="info"
            :patient-config="patientConfig"
            :treatment-statistics="treatmentStatistics"
            :suggestion="suggestion"
            :continue-mapping="continueMapping"
            :signature-url="signatureUrl"
            @finished="finished"
          />
        </export-container>
        <export-container v-if="singleReports.GuideReport" :vertical="false">
          <guide-report :info="info" :diagnosis="diagnosis" :treat-guide-statistics="treatGuideStatistics" @finished="finished" />
        </export-container>
        <export-container v-if="singleReports.ProfessionalReport">
          <professional-report :info="info" :treat-pro-statistics="treatProStatistics" :signature-url="signatureUrl" @finished="finished" />
        </export-container>

        <export-container v-if="reports.ContinuousChart" :vertical="false">
          <multiple-report-container title="连续图谱" :info="info">
            <ContinuousChart
              :patient-config="patientConfig"
              :list="continueMapping.glucoseDataList"
              :event-list="continueMapping.glucoseDeventList"
              @finished="finished"
            />
          </multiple-report-container>
        </export-container>

        <export-container v-if="reports.HourChart" :vertical="false">
          <multiple-report-container title="24小时图谱" :info="info">
            <HourChart :patient-config="patientConfig" :list="hourMapping" @finished="finished" />
          </multiple-report-container>
        </export-container>

        <export-container v-if="reports.EventChart" :vertical="false">
          <multiple-report-container title="事件图谱" :info="info">
            <EventChart
              :patient-config="patientConfig"
              :exercise-event-data-list="eventMapping.exerciseEventDataList"
              :food-event-data-list="eventMapping.foodEventDataList"
              :medication-event-data-list="eventMapping.medicationEventDataList"
              :insulin-event-data-list="eventMapping.insulinEventDataList"
              @finished="finished"
            />
          </multiple-report-container>
        </export-container>

        <export-container v-if="reports.TrendChart" :vertical="false">
          <multiple-report-container title="趋势图谱" :info="info">
            <TrendChart :patient-config="patientConfig" :list="trendMmapping.trendMmappingDataList" @finished="finished" />
          </multiple-report-container>
        </export-container>

        <export-container v-if="reports.StatisticTable" :vertical="false">
          <multiple-report-container title="统计结果" :info="info">
            <repot-statistic-table :patient-config="patientConfig" :list="treatmentStatistics" @finished="finished" />
          </multiple-report-container>
        </export-container>
      </div>
    </div>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  import jspdfUtil from '@/utils/jspdfUtil'
  import delay from '@/utils/delay'

  import ExportContainer from '@/components/ExportContainer'
  import BaseReport from './BaseReport'
  import GuideReport from './GuideReport'
  import ProfessionalReport from './ProfessionalReport'
  import MultipleReportContainer from './MultipleReportContainer'
  import ContinuousChart from './ContinuousChart'
  import HourChart from './HourChart'
  import EventChart from './EventChart'
  import TrendChart from './TrendChart'
  import RepotStatisticTable from './RepotStatisticTable'
  export default {
    components: {
      ExportContainer,
      BaseReport,
      GuideReport,
      ProfessionalReport,
      MultipleReportContainer,
      ContinuousChart,
      HourChart,
      EventChart,
      TrendChart,
      RepotStatisticTable
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      info: {
        type: Object,
        default: () => {}
      },
      patientConfig: {
        type: Object,
        required: true
      },
      treatmentStatistics: {
        type: Array,
        required: true
      },
      treatGuideStatistics: {
        type: Array,
        required: true
      },
      treatProStatistics: {
        type: Array,
        required: true
      },
      suggestion: {
        type: String,
        required: true
      },
      diagnosis: {
        type: String,
        required: true
      },
      continueMapping: {
        type: Object,
        required: true
      },
      hourMapping: {
        type: Array,
        required: true
      },
      eventMapping: {
        type: Object,
        required: true
      },
      trendMmapping: {
        type: Object,
        required: true
      },
      signatureUrl: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        singleReports: {
          BaseReport: false,
          GuideReport: false,
          ProfessionalReport: false
        },
        reports: {
          ContinuousChart: false,
          HourChart: false,
          EventChart: false,
          TrendChart: false,
          StatisticTable: false
        },
        pageCount: 1,
        exportMethod: ''
      }
    },
    computed: {
      dialogVisible: {
        get() {
          return this.visible
        },
        set(val) {
          this.toggleDialog(val)
        }
      },
      hidden() {
        // return true
        // return false
        // return process.env.NODE_ENV !== 'development'
        return this.exportMethod === 'Pdf' || !this.exportMethod
      },
      countReport() {
        let count = 1
        for (let item in this.reports) {
          if (this.reports[item]) {
            count++
          }
        }
        return count
      }
    },
    methods: {
      filesToInstances(files) {
        return new Promise(resolve => {
          const length = files.length
          let instances = []
          let finished = 0
          files.forEach((file, index) => {
            const image = new Image()
            image.src = file
            image.onload = () => {
              instances[index] = image
              finished++
              if (finished === length) {
                const width = 2104
                const heights = 2976
                const canvas = document.createElement('canvas')
                canvas.width = width
                canvas.height = 2976 * instances.length
                this.height = 2976 * instances.length
                const context = canvas.getContext('2d')
                let y = 0
                instances.forEach(item => {
                  context.drawImage(item, 0, y, width, heights)
                  y += heights
                })
                const base64Url = canvas.toDataURL('image/jpeg', 1)
                resolve(base64Url)
              }
            }
          })
        })
      },
      initExport() {
        this.singleReports = {}
        this.reports = {}
        this.pageCount = 0
      },
      export(exportMethod, singleReports, reports) {
        this.$notify({
          title: '正在渲染',
          message: '正在渲染图表，请等待~',
          type: 'success'
        })

        this.exportMethod = exportMethod // Print Pdf

        // console.log(singleReports, reports)

        for (let item in singleReports) {
          if (singleReports[item] === true) {
            this.pageCount++
          }
        }

        for (let item in reports) {
          if (reports[item] === true) {
            this.pageCount++
          }
        }
        console.log(this.pageCount, 'pageCount')

        this.singleReports = singleReports
        this.reports = reports
      },
      // async autoPrint() {
      //   await jspdfUtil.autoPrint({
      //     element: document.querySelector(
      //       `#element-to-print-${this.exportMethod}`
      //     ),
      //     scale: this.countReport < 4 ? 3 : 2
      //   })
      //   this.$emit('finished')
      // },
      async autoPrint() {
        const loading = this.$loading({
          lock: true,
          text: '打印加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        let nodeArr = document.querySelectorAll('.export-container')
        let imgArr = []
        for (let item of nodeArr) {
          let img = await jspdfUtil.canvasToImage({
            element: item,
            scale: 3
          })
          imgArr.push(img)
        }
        let res = await this.filesToInstances(imgArr)
        await jspdfUtil.getPrint({
          img: res,
          canvasWidth: 2104,
          canvasHeight: this.height
        })
        loading.close()
        this.$emit('finished')
      },
      async exportPdf() {
        const loading = this.$loading({
          lock: true,
          text: '正在导出',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        let time = dayjs().format('YYYY-MM-DD')
        let nodeArr = document.querySelectorAll('.export-container')
        let imgArr = []
        for (let item of nodeArr) {
          let img = await jspdfUtil.canvasToImage({
            element: item,
            scale: 3
          })
          imgArr.push(img)
        }
        let res = await this.filesToInstances(imgArr)
        await jspdfUtil.getPdf({
          img: res,
          canvasWidth: 2104,
          canvasHeight: this.height,
          fileName: `${this.info.patientName}的动态血糖报告_${time}.pdf`
        })
        loading.close()
        this.$emit('finished')
      },

      async finished() {
        this.pageCount--

        if (this.pageCount === 0) {
          await delay.wait(this.countReport < 4 ? 2000 : 3000)

          this.$notify({
            title: '渲染结束',
            message: '图表渲染结束，正在处理导出报告中~',
            type: 'success'
          })

          if (this.exportMethod === 'Print') {
            this.$emit('finished')
          } else if (this.exportMethod === 'Pdf') {
            let time = dayjs().format('YYYY-MM-DD')

            await jspdfUtil.exportPdf({
              element: document.querySelector(`#element-to-print-${this.exportMethod}`),
              fileName: `${this.info.patientName}的动态血糖报告_${time}.pdf`,
              scale: this.countReport < 4 ? 3 : 2
            })
            this.$emit('finished')
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .report-export {
    overflow: hidden;
  }

  .hidden-print {
    width: 1px;
    height: 1px;
    opacity: 0.01;
  }

  .export-container-wrapper {
    width: 1052px;
  }
</style>
